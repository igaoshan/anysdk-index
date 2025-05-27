# OSS 最佳实践

## 配置建议

### 1. 安全性配置
- 使用环境变量或配置中心存储敏感信息（如 AccessKey）
- 为不同的环境（开发、测试、生产）使用不同的存储桶
- 定期轮换 AccessKey
- 使用最小权限原则配置 IAM 策略

### 2. 性能优化
- 合理设置分片大小（建议 5MB）
- 使用 CDN 加速静态资源访问
- 对于大文件，优先使用分片上传
- 适当配置缓存策略

### 3. 成本控制
- 及时清理临时文件
- 使用生命周期规则自动管理文件
- 选择合适的存储类型（标准、低频、归档）
- 监控存储使用量

## 使用建议

### 1. 文件命名
- 使用有意义的文件名
- 避免使用特殊字符
- 建议使用 UUID 或时间戳作为文件名前缀
- 保持目录结构清晰

### 2. 错误处理
- 实现完善的异常处理机制
- 记录详细的操作日志
- 设置合理的重试策略
- 监控上传/下载失败率

### 3. 代码示例

```java
// 推荐的文件上传方式
public String uploadFile(MultipartFile file) {
    try {
        // 生成唯一文件名
        String fileName = UUID.randomUUID().toString() + 
            getFileExtension(file.getOriginalFilename());
        
        // 使用分片上传处理大文件
        UploadOptions options = file.getSize() > 5 * 1024 * 1024 ?
            UploadOptions.largeFile(false, 5 * 1024 * 1024) :
            UploadOptions.publicFile();
            
        return ossService.uploadFile(file, fileName, options);
    } catch (OssException e) {
        log.error("文件上传失败", e);
        throw new BusinessException("文件上传失败");
    }
}
```

## 监控建议

### 1. 关键指标
- 上传/下载成功率
- 响应时间
- 存储使用量
- 带宽使用情况
- 错误率

### 2. 告警设置
- 存储空间使用率超过阈值
- 上传/下载失败率异常
- 响应时间异常
- 错误率异常

## 迁移建议

### 1. 服务商迁移
- 保持文件路径结构一致
- 使用双写策略进行平滑迁移
- 验证文件完整性
- 保留旧服务商配置作为备份

### 2. 版本升级
- 阅读更新日志
- 在测试环境充分验证
- 制定回滚方案
- 选择低峰期进行升级 