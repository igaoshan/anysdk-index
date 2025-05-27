# API 参考

## 核心接口

### IOcrService
OCR 服务的主要接口，提供所有图片识别相关的功能。

#### 方法列表

##### recognize
```java
OcrResult recognize(File file, OcrOptions options)
```
识别本地图片文件。

**参数：**
- `file`: File - 要识别的图片文件
- `options`: OcrOptions - 识别选项

**返回：**
- `OcrResult`: 识别结果

##### recognize
```java
OcrResult recognize(String imageUrl, OcrOptions options)
```
识别网络图片。

**参数：**
- `imageUrl`: String - 图片URL
- `options`: OcrOptions - 识别选项

**返回：**
- `OcrResult`: 识别结果

##### recognize
```java
OcrResult recognize(InputStream inputStream, OcrOptions options)
```
识别图片输入流。

**参数：**
- `inputStream`: InputStream - 图片输入流
- `options`: OcrOptions - 识别选项

**返回：**
- `OcrResult`: 识别结果

##### recognize
```java
OcrResult recognize(byte[] imageBytes, OcrOptions options)
```
识别图片字节数组。

**参数：**
- `imageBytes`: byte[] - 图片字节数组
- `options`: OcrOptions - 识别选项

**返回：**
- `OcrResult`: 识别结果

##### recognizeBatch
```java
List<OcrResult> recognizeBatch(List<File> files, OcrOptions options)
```
批量识别图片。

**参数：**
- `files`: List&lt;File&gt; - 要识别的图片文件列表
- `options`: OcrOptions - 识别选项

**返回：**
- `List&lt;OcrResult&gt;`: 识别结果列表

##### recognizeAsync
```java
CompletableFuture<OcrResult> recognizeAsync(File file, OcrOptions options)
```
异步识别图片。

**参数：**
- `file`: File - 要识别的图片文件
- `options`: OcrOptions - 识别选项

**返回：**
- `CompletableFuture&lt;OcrResult&gt;`: 异步识别结果

## 数据模型

### OcrOptions
OCR 识别选项。

#### 属性
- `language`: String - 识别语言
- `detectOrientation`: boolean - 是否检测图片方向
- `detectLanguage`: boolean - 是否检测语言
- `probability`: boolean - 是否返回置信度
- `preprocess`: PreprocessOptions - 图片预处理选项

### OcrResult
OCR 识别结果。

#### 属性
- `text`: String - 识别文本
- `confidence`: double - 置信度
- `orientation`: float - 图片方向
- `language`: String - 识别语言
- `regions`: List&lt;OcrRegion&gt; - 识别区域列表

### OcrRegion
OCR 识别区域。

#### 属性
- `text`: String - 区域文本
- `location`: Rectangle - 区域位置
- `confidence`: double - 区域置信度

### PreprocessOptions
图片预处理选项。

#### 属性
- `resize`: Dimension - 调整大小
- `grayscale`: boolean - 是否灰度化
- `denoise`: boolean - 是否降噪

## 异常类

### OcrException
OCR 服务通用异常。

### ProviderException
服务商特定异常。

### ConfigurationException
配置相关异常。

## 常量

### 服务商类型
- `ALIYUN`: 阿里云 OCR
- `TENCENT`: 腾讯云 OCR
- `BAIDU`: 百度云 OCR

### 语言类型
- `ZH`: 中文
- `EN`: 英文
- `JA`: 日文
- `KO`: 韩文

## 配置属性

### 通用配置
```yaml
anysdk:
  ocr:
    default-provider: aliyun
    connect-timeout: 5000
    read-timeout: 5000
    max-retries: 3
```

### 阿里云配置
```yaml
anysdk:
  ocr:
    providers:
      aliyun:
        type: aliyun
        access-key-id: your-access-key-id
        access-key-secret: your-access-key-secret
        region: cn-shanghai
```

### 腾讯云配置
```yaml
anysdk:
  ocr:
    providers:
      tencent:
        type: tencent
        secret-id: your-secret-id
        secret-key: your-secret-key
        region: ap-guangzhou
```

### 百度云配置
```yaml
anysdk:
  ocr:
    providers:
      baidu:
        type: baidu
        app-id: your-app-id
        api-key: your-api-key
        secret-key: your-secret-key
``` 