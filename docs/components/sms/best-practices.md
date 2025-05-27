# 最佳实践

## 1. 配置管理

### 1.1 敏感信息管理
- 使用环境变量或配置中心存储敏感信息
- 避免在代码中硬编码 AccessKey 等敏感信息
- 使用加密配置或密钥管理服务

```yaml
# 推荐：使用环境变量
anysdk:
  sms:
    providers:
      aliyun:
        access-key-id: ${ALIYUN_ACCESS_KEY_ID}
        access-key-secret: ${ALIYUN_ACCESS_KEY_SECRET}
```

### 1.2 多环境配置
- 为不同环境（开发、测试、生产）使用不同的配置
- 使用 Spring Profiles 管理环境配置
- 保持配置结构一致，便于维护

## 2. 异常处理

### 2.1 统一异常处理
```java
@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(SmsException.class)
    public ResponseEntity<ErrorResponse> handleSmsException(SmsException e) {
        // 统一处理短信异常
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(new ErrorResponse(e.getCode(), e.getMessage()));
    }
}
```

### 2.2 重试策略
- 对可重试的异常进行重试
- 使用指数退避算法
- 设置最大重试次数

```java
@Configuration
public class SmsConfig {
    @Bean
    public ISmsService smsService() {
        return new RetryableSmsService(
            new AliyunSmsService(config),
            new ExponentialBackoffRetry(3, 1000)
        );
    }
}
```

## 3. 性能优化

### 3.1 异步处理
- 使用异步发送处理大量短信
- 实现批量发送接口
- 使用线程池管理并发

```java
@Configuration
public class AsyncConfig {
    @Bean
    public Executor smsExecutor() {
        return new ThreadPoolTaskExecutor()
            .setCorePoolSize(5)
            .setMaxPoolSize(10)
            .setQueueCapacity(100);
    }
}
```

### 3.2 缓存策略
- 缓存模板信息
- 缓存配额信息
- 使用本地缓存减少网络请求

```java
@Service
public class CachedSmsService implements ISmsService {
    private final Cache<String, TemplateInfo> templateCache;
    
    public CachedSmsService() {
        this.templateCache = CacheBuilder.newBuilder()
            .expireAfterWrite(1, TimeUnit.HOURS)
            .build();
    }
}
```

## 4. 监控和日志

### 4.1 日志记录
- 记录关键操作日志
- 使用结构化日志
- 包含必要的上下文信息

```java
@Aspect
@Component
public class SmsLoggingAspect {
    @Around("execution(* com.anysdk.sms.ISmsService.*(..))")
    public Object logSmsOperation(ProceedingJoinPoint joinPoint) {
        // 记录操作日志
    }
}
```

### 4.2 监控指标
- 记录发送成功率
- 监控响应时间
- 跟踪配额使用情况

```java
@Service
public class MonitoredSmsService implements ISmsService {
    private final MeterRegistry registry;
    
    public void send(SmsRequest request) {
        Timer.Sample sample = Timer.start(registry);
        try {
            // 发送短信
            sample.stop(registry.timer("sms.send.time"));
        } catch (Exception e) {
            registry.counter("sms.send.error").increment();
            throw e;
        }
    }
}
```

## 5. 安全实践

### 5.1 输入验证
- 验证手机号格式
- 检查模板参数
- 限制发送频率

```java
public class SmsRequestValidator {
    public void validate(SmsRequest request) {
        // 验证手机号
        if (!isValidPhoneNumber(request.getPhoneNumber())) {
            throw new InvalidRequestException("Invalid phone number");
        }
        
        // 验证模板参数
        validateTemplateParams(request.getTemplateParams());
    }
}
```

### 5.2 访问控制
- 实现发送权限控制
- 限制IP访问
- 使用签名验证

```java
@Aspect
@Component
public class SmsAccessControlAspect {
    @Before("execution(* com.anysdk.sms.ISmsService.send(..))")
    public void checkAccess(JoinPoint joinPoint) {
        // 检查访问权限
    }
}
```

## 6. 测试策略

### 6.1 单元测试
- 测试核心业务逻辑
- 模拟外部依赖
- 验证异常处理

```java
@SpringBootTest
class SmsServiceTest {
    @Test
    void testSendSms() {
        // 测试发送短信
    }
    
    @Test
    void testInvalidPhoneNumber() {
        // 测试无效手机号
    }
}
```

### 6.2 集成测试
- 测试与外部服务集成
- 验证配置加载
- 测试端到端流程

```java
@SpringBootTest
class SmsIntegrationTest {
    @Test
    void testEndToEnd() {
        // 测试完整流程
    }
}
```

## 7. 部署建议

### 7.1 容器化
- 使用 Docker 容器部署
- 配置健康检查
- 实现优雅关闭

```dockerfile
FROM openjdk:17-jdk-slim
COPY target/*.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
```

### 7.2 高可用
- 实现服务降级
- 配置负载均衡
- 使用服务发现

```yaml
spring:
  cloud:
    loadbalancer:
      retry:
        enabled: true
```

## 8. 维护建议

### 8.1 版本管理
- 遵循语义化版本
- 维护更新日志
- 提供迁移指南

### 8.2 文档维护
- 及时更新文档
- 提供示例代码
- 记录常见问题 