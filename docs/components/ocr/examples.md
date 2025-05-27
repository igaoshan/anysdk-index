# 使用示例

## 1. 识别本地图片
```java
// 识别本地图片文件
File imageFile = new File("example.jpg");
OcrResult result = ocrService.recognize(
    imageFile,
    OcrOptions.defaultOptions()
);

// 获取识别结果
String text = result.getText();
double confidence = result.getConfidence();
```

## 2. 识别网络图片
```java
// 识别网络图片
String imageUrl = "https://example.com/image.jpg";
OcrResult result = ocrService.recognize(
    imageUrl,
    OcrOptions.defaultOptions()
);

// 获取识别结果
String text = result.getText();
double confidence = result.getConfidence();
```

## 3. 识别图片输入流
```java
// 识别图片输入流
InputStream inputStream = new FileInputStream("example.jpg");
OcrResult result = ocrService.recognize(
    inputStream,
    OcrOptions.defaultOptions()
);

// 获取识别结果
String text = result.getText();
double confidence = result.getConfidence();
```

## 4. 识别图片字节数组
```java
// 识别图片字节数组
byte[] imageBytes = Files.readAllBytes(Paths.get("example.jpg"));
OcrResult result = ocrService.recognize(
    imageBytes,
    OcrOptions.defaultOptions()
);

// 获取识别结果
String text = result.getText();
double confidence = result.getConfidence();
```

## 5. 批量识别图片
```java
// 批量识别图片
List<File> imageFiles = Arrays.asList(
    new File("image1.jpg"),
    new File("image2.jpg")
);
List<OcrResult> results = ocrService.recognizeBatch(
    imageFiles,
    OcrOptions.defaultOptions()
);

// 处理识别结果
for (OcrResult result : results) {
    log.info("识别文本: {}", result.getText());
    log.info("置信度: {}", result.getConfidence());
}
```

## 6. 自定义识别选项
```java
// 创建自定义识别选项
OcrOptions options = OcrOptions.builder()
    .language("zh")
    .detectOrientation(true)
    .detectLanguage(true)
    .probability(true)
    .build();

// 使用自定义选项识别图片
OcrResult result = ocrService.recognize(
    new File("example.jpg"),
    options
);
```

## 7. 处理识别结果
```java
// 获取完整的识别结果
OcrResult result = ocrService.recognize(
    new File("example.jpg"),
    OcrOptions.defaultOptions()
);

// 获取识别文本
String text = result.getText();

// 获取置信度
double confidence = result.getConfidence();

// 获取图片方向
float orientation = result.getOrientation();

// 获取识别语言
String language = result.getLanguage();

// 获取识别区域
List<OcrRegion> regions = result.getRegions();
for (OcrRegion region : regions) {
    log.info("区域文本: {}", region.getText());
    log.info("区域位置: {}", region.getLocation());
    log.info("区域置信度: {}", region.getConfidence());
}
```

## 8. 异常处理
```java
try {
    OcrResult result = ocrService.recognize(
        new File("example.jpg"),
        OcrOptions.defaultOptions()
    );
    // 处理识别结果
} catch (OcrException e) {
    // 处理 OCR 异常
    log.error("OCR 识别失败: {}", e.getMessage());
} catch (ProviderException e) {
    // 处理服务商特定异常
    log.error("服务商异常: {}", e.getMessage());
}
```

## 9. 异步识别
```java
// 异步识别图片
CompletableFuture<OcrResult> future = ocrService.recognizeAsync(
    new File("example.jpg"),
    OcrOptions.defaultOptions()
);

// 处理异步结果
future.thenAccept(result -> {
    // 处理识别结果
    log.info("识别文本: {}", result.getText());
    log.info("置信度: {}", result.getConfidence());
}).exceptionally(throwable -> {
    // 处理异常
    log.error("识别失败", throwable);
    return null;
});
```

## 10. 图片预处理
```java
// 创建图片预处理选项
OcrOptions options = OcrOptions.builder()
    .preprocess(PreprocessOptions.builder()
        .resize(800, 600)
        .grayscale(true)
        .denoise(true)
        .build())
    .build();

// 使用预处理选项识别图片
OcrResult result = ocrService.recognize(
    new File("example.jpg"),
    options
);
``` 