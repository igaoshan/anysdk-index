# 使用示例

## 1. 定时发送
```java
SmsRequest request = SmsRequest.builder()
    .phoneNumber(phoneNumber)
    .templateId(templateId)
    .scheduledTime(LocalDateTime.now().plusHours(1))
    .build();

SmsResponse response = smsService.send(request);
```

## 2. 批量发送
```java
List<SmsRequest> requests = Arrays.asList(
    SmsRequest.builder()
        .phoneNumber("13800138000")
        .templateId("SMS_VERIFY_CODE")
        .templateParams(Map.of("code", "123456"))
        .build(),
    SmsRequest.builder()
        .phoneNumber("13800138001")
        .templateId("SMS_VERIFY_CODE")
        .templateParams(Map.of("code", "654321"))
        .build()
);

List<SmsResponse> responses = smsService.sendBatch(requests);
```

## 3. 状态查询
```java
// 查询单个消息状态
SmsResponse status = smsService.queryStatus(messageId);

// 批量查询消息状态
List<String> messageIds = Arrays.asList("msg1", "msg2");
List<SmsResponse> statuses = smsService.queryStatusBatch(messageIds);
```

## 4. 配额查询
```java
// 查询账户配额
SmsResponse quota = smsService.getQuota();

// 查询特定服务商的配额
SmsResponse providerQuota = smsService.getQuota("aliyun");
```

## 5. 异常处理
```java
try {
    SmsResponse response = smsService.send(request);
    // 处理成功响应
} catch (SmsException e) {
    // 处理短信发送异常
    log.error("短信发送失败: {}", e.getMessage());
} catch (ProviderException e) {
    // 处理服务商特定异常
    log.error("服务商异常: {}", e.getMessage());
}
```

## 6. 自定义模板参数
```java
SmsRequest request = SmsRequest.builder()
    .phoneNumber(phoneNumber)
    .templateId("SMS_NOTIFICATION")
    .templateParams(Map.of(
        "name", "张三",
        "orderNo", "ORDER123456",
        "amount", "100.00"
    ))
    .build();
```

## 7. 异步发送
```java
CompletableFuture<SmsResponse> future = smsService.sendAsync(request);
future.thenAccept(response -> {
    // 处理异步响应
    log.info("短信发送结果: {}", response);
}).exceptionally(throwable -> {
    // 处理异常
    log.error("异步发送失败", throwable);
    return null;
});
```

## 8. 多服务商切换
```java
// 使用默认服务商
SmsResponse response1 = smsService.send(request);

// 指定服务商
SmsResponse response2 = smsService.send(request, "tencent");

// 动态切换默认服务商
smsService.setDefaultProvider("tencent");
SmsResponse response3 = smsService.send(request);
```

## 9. 自定义配置
```java
@Configuration
public class SmsConfig {
    @Bean
    public ISmsService smsService() {
        SmsConfig config = new BaseSmsConfig()
            .setProviderType("aliyun")
            .setAccessKeyId("your-access-key-id")
            .setAccessKeySecret("your-access-key-secret")
            .setSignName("your-sign-name")
            .setConnectTimeout(5000)
            .setReadTimeout(5000)
            .setMaxRetries(3);
            
        return new AliyunSmsService(config);
    }
}
```

## 10. 监控和统计
```java
// 获取发送统计
SmsStatistics statistics = smsService.getStatistics(
    LocalDate.now().minusDays(7),
    LocalDate.now()
);

// 获取失败原因统计
Map<String, Integer> failureStats = smsService.getFailureStatistics(
    LocalDate.now().minusDays(30),
    LocalDate.now()
);
``` 