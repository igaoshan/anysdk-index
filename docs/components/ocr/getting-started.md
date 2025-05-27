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
    <groupId>cn.com.anysdk</groupId>
    <artifactId>anysdk-ocr</artifactId>
    <version>${anysdk.version}</version>
</dependency>
```

### 添加Spring Boot Starter（可选）
```xml
<dependency>
    <groupId>cn.com.anysdk</groupId>
    <artifactId>anysdk-spring-boot-starter</artifactId>
    <version>${anysdk.version}</version>
</dependency>
```

## 配置示例

### application.yml配置示例：
```yaml
anysdk:
  ocr:
    default-provider: aliyun  # 默认服务商
    providers:
      aliyun:  # 阿里云配置
        enabled: true
        access-key-id: your-access-key-id
        access-key-secret: your-access-key-secret
        region: cn-shanghai
      tencent:  # 腾讯云配置
        enabled: true
        secret-id: your-secret-id
        secret-key: your-secret-key
        region: ap-guangzhou
      baidu:  # 百度云配置
        enabled: true
        app-id: your-app-id
        api-key: your-api-key
        secret-key: your-secret-key
    logging:  # 日志配置
      enabled: true
      level: INFO
      log-request-response: true
      log-duration: true
      log-operation-type: true
      log-provider: true
      log-request-id: true
```

## 基本使用

### Spring Boot 环境使用
```java
@Autowired
private IOcrService ocrService;

public void recognizeImage(MultipartFile file) {
    // 识别图片
    OcrResult result = ocrService.recognize(
        file.getInputStream(),
        OcrOptions.defaultOptions()
    );
    
    // 获取识别结果
    String text = result.getText();
    double confidence = result.getConfidence();
    
    // 处理识别结果
    log.info("识别文本: {}", text);
    log.info("置信度: {}", confidence);
}
```

### 手动创建服务实例
```java
// 创建配置
IOcrConfig config = new AliyunOcrConfig()
    .setAccessKeyId("your-access-key-id")
    .setAccessKeySecret("your-access-key-secret")
    .setRegion("cn-shanghai");

// 创建服务实例
IOcrService ocrService = new AliyunOcrService(config);

// 识别图片
OcrResult result = ocrService.recognize(
    new File("example.jpg"),
    OcrOptions.defaultOptions()
);
```

## 下一步
- 查看[使用示例](./examples)了解更多高级用法
- 阅读[API参考](./api-reference)了解完整的API文档
- 参考[最佳实践](./best-practices)了解推荐的使用方式 