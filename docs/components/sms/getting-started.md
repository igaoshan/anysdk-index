# 快速开始

## 环境要求
- JDK 17 或更高版本
- Maven 3.8+
- Node.js 18+
- npm 9+

## 安装依赖

### 添加Maven依赖
```xml
<dependency>
    <groupId>com.anysdk.sms</groupId>
    <artifactId>anysdk-sms</artifactId>
    <version>${anysdk.version}</version>
</dependency>
```

### 添加Spring Boot Starter（可选）
```xml
<dependency>
    <groupId>com.anysdk.sms</groupId>
    <artifactId>anysdk-spring-boot-starter</artifactId>
    <version>${anysdk.version}</version>
</dependency>
```

## 配置示例

### application.yml配置示例：
```yaml
anysdk:
  sms:
    default-provider: aliyun  # 默认服务商
    providers:
      aliyun:  # 阿里云配置
        type: aliyun
        access-key-id: your-access-key-id
        access-key-secret: your-access-key-secret
        sign-name: your-sign-name
        region: cn-hangzhou
      tencent:  # 腾讯云配置
        type: tencent
        access-key-id: your-access-key-id
        access-key-secret: your-access-key-secret
        sign-name: your-sign-name
        app-id: your-app-id
```

## 基本使用

### Spring Boot 环境使用
```java
@Autowired
private ISmsService smsService;

public void sendVerificationCode(String phoneNumber, String code) {
    SmsRequest request = SmsRequest.builder()
        .phoneNumber(phoneNumber)
        .templateId("SMS_VERIFY_CODE")
        .templateParams(Map.of("code", code))
        .build();
        
    SmsResponse response = smsService.send(request);
    // 处理响应...
}
```

### 手动创建服务实例
```java
// 创建配置
SmsConfig config = new BaseSmsConfig()
    .setProviderType("aliyun")
    .setAccessKeyId("your-access-key-id")
    .setAccessKeySecret("your-access-key-secret")
    .setSignName("your-sign-name");

// 创建服务实例
ISmsService smsService = new AliyunSmsService(config);

// 发送短信
SmsResponse response = smsService.send(request);
```

## 下一步
- 查看[使用示例](./examples)了解更多高级用法
- 阅读[API参考](./api-reference)了解完整的API文档
- 参考[最佳实践](./best-practices)了解推荐的使用方式 