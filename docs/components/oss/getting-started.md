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
    <artifactId>anysdk-oss</artifactId>
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
  oss:
    default-provider: aliyun  # 默认服务商
    providers:
      aliyun:  # 阿里云配置
        enabled: true
        endpoint: oss-cn-hangzhou.aliyuncs.com
        access-key-id: your-access-key-id
        access-key-secret: your-access-key-secret
        bucket-name: your-bucket-name
        private: false
        intranet: false
        custom-domain: your-custom-domain.com
      tencent:  # 腾讯云配置
        enabled: true
        endpoint: cos.ap-guangzhou.myqcloud.com
        access-key-id: your-secret-id
        access-key-secret: your-secret-key
        bucket-name: your-bucket-name
        private: false
        intranet: false
        custom-domain: your-custom-domain.com
      minio:  # MinIO配置
        enabled: true
        endpoint: http://localhost:9000
        access-key-id: minioadmin
        access-key-secret: minioadmin
        bucket-name: anysdk
        private: false
        intranet: false
        custom-domain: http://localhost:9000
      local:  # 本地文件系统配置
        base-path: ${java.io.tmpdir}/anysdk-oss
        private: false
        intranet: false
        custom-domain: http://localhost:8081
    logging:  # 日志配置
      enabled: true
      level: INFO
      log-request-response: true
      log-duration: true
      log-file-size: true
      log-operation-type: true
      log-provider: true
      log-path: true
      log-request-id: true
```

## 基本使用

### Spring Boot 环境使用
```java
@Autowired
private IOssService ossService;

public void uploadFile(MultipartFile file) {
    // 上传公开文件
    String publicUrl = ossService.uploadFile(file, "public/test.jpg", UploadOptions.publicFile());
    
    // 上传私有文件（1小时过期）
    String privateUrl = ossService.uploadFile(file, "private/test.jpg", UploadOptions.privateFile(3600L));
    
    // 上传大文件（使用分片上传）
    String largeFileUrl = ossService.uploadFile(file, "large/test.zip", UploadOptions.largeFile(false, 5 * 1024 * 1024));
}
```

### 手动创建服务实例
```java
// 创建配置
IOssConfig config = new AliyunOssConfig()
    .setEndpoint("oss-cn-hangzhou.aliyuncs.com")
    .setAccessKeyId("your-access-key-id")
    .setAccessKeySecret("your-access-key-secret")
    .setBucketName("your-bucket-name");

// 创建服务实例
IOssService ossService = new AliyunOssService(config);

// 上传文件
String url = ossService.uploadFile(file, "test.jpg", UploadOptions.publicFile());
```

## 下一步
- 查看[使用示例](./examples)了解更多高级用法
- 阅读[API参考](./api-reference)了解完整的API文档
- 参考[最佳实践](./best-practices)了解推荐的使用方式 