# AnySDK-OSS 使用示例

本文档展示如何使用 AnySDK-OSS 系统进行不同 OSS 服务之间的切换和文件操作。

## 1. 示例代码

```java
import cn.com.anysdk.oss.*;
import cn.com.anysdk.oss.config.*;
import cn.com.anysdk.oss.exception.*;

public class OssExample {
    private static final Logger logger = LoggerFactory.getLogger(OssExample.class);
    private IOssService ossService;

    public void runExample() {
        try {
            // 1. 首先使用本地文件系统作为 OSS 服务
            setupLocalFileSystem();
            uploadToLocalFileSystem();

            // 2. 切换到阿里云 OSS 服务
            switchToAliyunOss();
            uploadToAliyunOss();
        } catch (OssException e) {
            logger.error("OSS 操作失败", e);
        }
    }

    private void setupLocalFileSystem() {
        // 配置本地文件系统
        IOssConfig localConfig = new LocalFileSystemConfig()
            .setBasePath("/tmp/anysdk-oss-example")
            .setPublicEndpoint("http://localhost:8080/files")
            .setPrivateEndpoint("http://localhost:8080/private/files");

        // 创建本地文件系统 OSS 服务
        ossService = OssServiceFactory.createOssService(localConfig, OssProvider.LOCAL);
        logger.info("已初始化本地文件系统 OSS 服务");
    }

    private void uploadToLocalFileSystem() {
        try {
            // 创建测试文件
            File testFile = createTestFile("local-test.txt", "这是本地文件系统测试内容");

            // 上传到本地文件系统
            String url = ossService.uploadFile(
                testFile,
                "local/test.txt",
                UploadOptions.publicFile()
            );

            logger.info("文件已上传到本地文件系统，访问URL: {}", url);

            // 验证文件是否存在
            boolean exists = ossService.exists("local/test.txt");
            logger.info("文件在本地文件系统中是否存在: {}", exists);

        } catch (IOException e) {
            logger.error("创建测试文件失败", e);
        }
    }

    private void switchToAliyunOss() {
        // 配置阿里云 OSS
        IOssConfig aliyunConfig = new AliyunOssConfig()
            .setAccessKeyId("your-access-key-id")
            .setAccessKeySecret("your-access-key-secret")
            .setBucketName("your-bucket-name")
            .setPublicEndpoint("oss-cn-hangzhou.aliyuncs.com")
            .setPrivateEndpoint("oss-cn-hangzhou-internal.aliyuncs.com");

        // 切换到阿里云 OSS 服务
        ossService = OssServiceFactory.createOssService(aliyunConfig, OssProvider.ALIYUN);
        logger.info("已切换到阿里云 OSS 服务");
    }

    private void uploadToAliyunOss() {
        try {
            // 1. 上传公开文件
            File publicFile = createTestFile("public-test.txt", "这是阿里云 OSS 公开文件测试内容");
            String publicUrl = ossService.uploadFile(
                publicFile,
                "public/test.txt",
                UploadOptions.publicFile()
            );
            logger.info("公开文件已上传到阿里云 OSS，访问URL: {}", publicUrl);

            // 2. 上传私有文件
            File privateFile = createTestFile("private-test.txt", "这是阿里云 OSS 私有文件测试内容");
            String privateUrl = ossService.uploadFile(
                privateFile,
                "private/test.txt",
                UploadOptions.privateFile(3600L) // 1小时过期
            );
            logger.info("私有文件已上传到阿里云 OSS，访问URL: {}", privateUrl);

            // 3. 验证文件访问
            // 公开文件可以直接访问
            String publicFileUrl = ossService.getFileUrl("public/test.txt", null);
            logger.info("公开文件永久访问URL: {}", publicFileUrl);

            // 私有文件需要带过期时间的访问URL
            String privateFileUrl = ossService.getFileUrl("private/test.txt", 3600L);
            logger.info("私有文件临时访问URL: {}", privateFileUrl);

        } catch (IOException e) {
            logger.error("创建测试文件失败", e);
        }
    }

    private File createTestFile(String fileName, String content) throws IOException {
        File file = new File(fileName);
        Files.write(file.toPath(), content.getBytes(StandardCharsets.UTF_8));
        return file;
    }
}