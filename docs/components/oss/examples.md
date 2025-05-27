# 使用示例

## 1. 文件上传
```java
// 上传公开文件
String publicUrl = ossService.uploadFile(file, "public/test.jpg", UploadOptions.publicFile());

// 上传私有文件（1小时过期）
String privateUrl = ossService.uploadFile(file, "private/test.jpg", UploadOptions.privateFile(3600L));

// 上传大文件（使用分片上传）
String largeFileUrl = ossService.uploadFile(file, "large/test.zip", UploadOptions.largeFile(false, 5 * 1024 * 1024));
```

## 2. 文件下载
```java
// 下载文件到输入流
InputStream inputStream = ossService.downloadFile("test.jpg");

// 下载文件到本地
File localFile = new File("local-test.jpg");
ossService.downloadFile("test.jpg", localFile);

// 下载大文件（使用分片下载）
ossService.downloadLargeFile("large-file.zip", localFile, 5 * 1024 * 1024);
```

## 3. 文件删除
```java
// 删除单个文件
boolean success = ossService.deleteFile("test.jpg");

// 批量删除文件
List<String> keys = Arrays.asList("test1.jpg", "test2.jpg");
boolean allSuccess = ossService.deleteFiles(keys);
```

## 4. 文件存在性检查
```java
// 检查文件是否存在
boolean exists = ossService.doesObjectExist("test.jpg");

// 批量检查文件是否存在
Map<String, Boolean> existenceMap = ossService.doesObjectsExist(keys);
```

## 5. 获取文件URL
```java
// 获取公开访问URL
String publicUrl = ossService.getPublicUrl("test.jpg");

// 获取私有访问URL（1小时过期）
String privateUrl = ossService.getPrivateUrl("test.jpg", 3600L);

// 获取带签名的URL（包含自定义参数）
Map<String, String> params = new HashMap<>();
params.put("x-oss-process", "image/resize,w_200");
String signedUrl = ossService.getSignedUrl("test.jpg", 3600L, params);
```

## 6. 文件列表
```java
// 列出指定目录下的文件
List<OssObject> objects = ossService.listObjects("images/");

// 列出指定目录下的文件（带分页）
List<OssObject> pagedObjects = ossService.listObjects("images/", 100, "next-marker");

// 列出指定目录下的文件（带前缀和后缀）
List<OssObject> filteredObjects = ossService.listObjects("images/", "prefix", "suffix");
```

## 7. 文件复制
```java
// 复制文件
String newUrl = ossService.copyObject("source.jpg", "target.jpg");

// 跨服务商复制文件
String crossProviderUrl = ossService.copyObject("source.jpg", "target.jpg", "tencent");
```

## 8. 文件移动
```java
// 移动文件
String newUrl = ossService.moveObject("source.jpg", "target.jpg");

// 跨服务商移动文件
String crossProviderUrl = ossService.moveObject("source.jpg", "target.jpg", "tencent");
```

## 9. 获取文件元信息
```java
// 获取文件元信息
OssObjectMetadata metadata = ossService.getObjectMetadata("test.jpg");

// 获取文件大小
long size = ossService.getObjectSize("test.jpg");

// 获取文件最后修改时间
Date lastModified = ossService.getObjectLastModified("test.jpg");
```

## 10. 设置文件元信息
```java
// 设置文件元信息
Map<String, String> metadata = new HashMap<>();
metadata.put("Content-Type", "image/jpeg");
metadata.put("x-oss-meta-author", "John Doe");
ossService.setObjectMetadata("test.jpg", metadata);
```

## 11. 异步操作
```java
// 异步上传文件
CompletableFuture<String> future = ossService.uploadFileAsync(file, "test.jpg", UploadOptions.publicFile());
future.thenAccept(url -> {
    // 处理上传结果
    log.info("文件上传成功: {}", url);
}).exceptionally(throwable -> {
    // 处理异常
    log.error("文件上传失败", throwable);
    return null;
});

// 异步下载文件
CompletableFuture<InputStream> downloadFuture = ossService.downloadFileAsync("test.jpg");
downloadFuture.thenAccept(inputStream -> {
    // 处理下载结果
    // 使用输入流
}).exceptionally(throwable -> {
    // 处理异常
    log.error("文件下载失败", throwable);
    return null;
});
```

## 12. 批量操作
```java
// 批量上传文件
List<MultipartFile> files = Arrays.asList(file1, file2);
List<String> urls = ossService.uploadFiles(files, "images/", UploadOptions.publicFile());

// 批量下载文件
List<String> keys = Arrays.asList("test1.jpg", "test2.jpg");
Map<String, InputStream> streams = ossService.downloadFiles(keys);

// 批量删除文件
List<String> keysToDelete = Arrays.asList("test1.jpg", "test2.jpg");
boolean allSuccess = ossService.deleteFiles(keysToDelete);
``` 