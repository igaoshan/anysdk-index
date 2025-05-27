# API 参考

## 核心接口

### ISmsService
短信服务的主要接口，提供所有短信相关的操作。

#### 方法列表

##### send
```java
SmsResponse send(SmsRequest request)
```
发送单条短信。

**参数：**
- `request`: SmsRequest - 短信请求对象

**返回：**
- `SmsResponse`: 发送结果

##### sendBatch
```java
List&lt;SmsResponse&gt; sendBatch(List&lt;SmsRequest&gt; requests)
```
批量发送短信。

**参数：**
- `requests`: List&lt;SmsRequest&gt; - 短信请求对象列表

**返回：**
- `List&lt;SmsResponse&gt;`: 发送结果列表

##### sendAsync
```java
CompletableFuture&lt;SmsResponse&gt; sendAsync(SmsRequest request)
```
异步发送短信。

**参数：**
- `request`: SmsRequest - 短信请求对象

**返回：**
- `CompletableFuture&lt;SmsResponse&gt;`: 异步发送结果

##### queryStatus
```java
SmsResponse queryStatus(String messageId)
```
查询短信发送状态。

**参数：**
- `messageId`: String - 短信消息ID

**返回：**
- `SmsResponse`: 查询结果

##### getQuota
```java
SmsResponse getQuota()
```
获取短信配额信息。

**返回：**
- `SmsResponse`: 配额信息

## 数据模型

### SmsRequest
短信请求对象。

#### 属性
- `phoneNumber`: String - 手机号码
- `templateId`: String - 模板ID
- `templateParams`: Map&lt;String, String&gt; - 模板参数
- `scheduledTime`: LocalDateTime - 定时发送时间（可选）
- `provider`: String - 指定服务商（可选）

### SmsResponse
短信响应对象。

#### 属性
- `messageId`: String - 消息ID
- `status`: String - 发送状态
- `code`: String - 响应码
- `message`: String - 响应消息
- `timestamp`: LocalDateTime - 时间戳

### SmsConfig
短信配置对象。

#### 属性
- `providerType`: String - 服务商类型
- `accessKeyId`: String - 访问密钥ID
- `accessKeySecret`: String - 访问密钥密码
- `signName`: String - 签名名称
- `region`: String - 区域（可选）
- `connectTimeout`: int - 连接超时时间
- `readTimeout`: int - 读取超时时间
- `maxRetries`: int - 最大重试次数

## 异常类

### SmsException
短信服务通用异常。

### ProviderException
服务商特定异常。

### ConfigurationException
配置相关异常。

## 常量

### 服务商类型
- `ALIYUN`: 阿里云
- `TENCENT`: 腾讯云
- `HUAWEI`: 华为云

### 状态码
- `SUCCESS`: 成功
- `FAILED`: 失败
- `PENDING`: 处理中
- `TIMEOUT`: 超时

## 配置属性

### 通用配置
```yaml
anysdk:
  sms:
    default-provider: aliyun
    connect-timeout: 5000
    read-timeout: 5000
    max-retries: 3
```

### 阿里云配置
```yaml
anysdk:
  sms:
    providers:
      aliyun:
        type: aliyun
        access-key-id: your-access-key-id
        access-key-secret: your-access-key-secret
        sign-name: your-sign-name
        region: cn-hangzhou
```

### 腾讯云配置
```yaml
anysdk:
  sms:
    providers:
      tencent:
        type: tencent
        access-key-id: your-access-key-id
        access-key-secret: your-access-key-secret
        sign-name: your-sign-name
        app-id: your-app-id
```

### 华为云配置
```yaml
anysdk:
  sms:
    providers:
      huawei:
        type: huawei
        access-key-id: your-access-key-id
        access-key-secret: your-access-key-secret
        sign-name: your-sign-name
        app-key: your-app-key
        app-secret: your-app-secret
``` 