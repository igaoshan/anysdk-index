# API 参考

## 核心接口

### IOssService
对象存储服务的主要接口，提供所有文件操作相关的功能。

#### 方法列表

##### uploadFile
```java
String uploadFile(MultipartFile file, String key, UploadOptions options)
```
上传文件。

**参数：**
- `file`: MultipartFile - 要上传的文件
- `key`: String - 文件在存储中的唯一标识
- `options`: UploadOptions - 上传选项

**返回：**
- `String`: 文件访问URL

##### downloadFile
```java
InputStream downloadFile(String key)
```
下载文件。

**参数：**
- `key`: String - 文件在存储中的唯一标识

**返回：**
- `InputStream`: 文件输入流

##### deleteFile
```java
boolean deleteFile(String key)
```
删除文件。

**参数：**
- `key`: String - 文件在存储中的唯一标识

**返回：**
- `boolean`: 是否删除成功

##### getPublicUrl
```java
String getPublicUrl(String key)
```
获取文件的公开访问URL。

**参数：**
- `key`: String - 文件在存储中的唯一标识

**返回：**
- `String`: 公开访问URL

##### getPrivateUrl
```java
String getPrivateUrl(String key, long expireSeconds)
```
获取文件的私有访问URL。

**参数：**
- `key`: String - 文件在存储中的唯一标识
- `expireSeconds`: long - URL过期时间（秒）

**返回：**
- `String`: 私有访问URL

## 数据模型

### UploadOptions
上传选项对象。

#### 属性
- `isPublic`: boolean - 是否公开访问
- `expireSeconds`: Long - 私有访问过期时间（秒）
- `isLargeFile`: boolean - 是否大文件
- `partSize`: Long - 分片大小（字节）
- `metadata`: Map&lt;String, String&gt; - 文件元数据

### OssObject
存储对象。

#### 属性
- `key`: String - 对象键
- `size`: long - 文件大小
- `lastModified`: Date - 最后修改时间
- `url`: String - 访问URL
- `metadata`: Map&lt;String, String&gt; - 元数据

### OssObjectMetadata
对象元数据。

#### 属性
- `contentType`: String - 内容类型
- `contentLength`: long - 内容长度
- `lastModified`: Date - 最后修改时间
- `metadata`: Map&lt;String, String&gt; - 自定义元数据

## 异常类

### OssException
对象存储服务通用异常。

### ProviderException
服务商特定异常。

### ConfigurationException
配置相关异常。

## 常量

### 服务商类型
- `ALIYUN`: 阿里云 OSS
- `TENCENT`: 腾讯云 COS
- `QINIU`: 七牛云 Kodo
- `MINIO`: MinIO
- `LOCAL`: 本地文件系统

### 访问模式
- `PUBLIC`: 公开访问
- `PRIVATE`: 私有访问

## 配置属性

### 通用配置
```yaml
anysdk:
  oss:
    default-provider: aliyun
    connect-timeout: 5000
    read-timeout: 5000
    max-retries: 3
```

### 阿里云配置
```yaml
anysdk:
  oss:
    providers:
      aliyun:
        type: aliyun
        endpoint: oss-cn-hangzhou.aliyuncs.com
        access-key-id: your-access-key-id
        access-key-secret: your-access-key-secret
        bucket-name: your-bucket-name
        private: false
        intranet: false
        custom-domain: your-custom-domain.com
```

### 腾讯云配置
```yaml
anysdk:
  oss:
    providers:
      tencent:
        type: tencent
        endpoint: cos.ap-guangzhou.myqcloud.com
        access-key-id: your-secret-id
        access-key-secret: your-secret-key
        bucket-name: your-bucket-name
        private: false
        intranet: false
        custom-domain: your-custom-domain.com
```

### MinIO配置
```yaml
anysdk:
  oss:
    providers:
      minio:
        type: minio
        endpoint: http://localhost:9000
        access-key-id: minioadmin
        access-key-secret: minioadmin
        bucket-name: anysdk
        private: false
        intranet: false
        custom-domain: http://localhost:9000
```

### 本地文件系统配置
```yaml
anysdk:
  oss:
    providers:
      local:
        type: local
        base-path: ${java.io.tmpdir}/anysdk-oss
        private: false
        intranet: false
        custom-domain: http://localhost:8081
```
