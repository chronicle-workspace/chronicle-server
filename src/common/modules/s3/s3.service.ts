import { PutObjectCommand, S3Client, S3ClientConfig } from "@aws-sdk/client-s3";
import { createReadStream } from "fs";

import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class S3Service {
  constructor(
    private readonly configService: ConfigService<
      {
        S3_ENDPOINT: string;
        S3_PUBLIC_URL: string;
        S3_BUCKET_NAME: string;
        S3_REGION: string;
        S3_ACCESS_KEY: string;
        S3_SECRET_KEY: string;
      },
      true
    >,
  ) {}

  #S3Endpoint = this.configService.get("S3_ENDPOINT", { infer: true });
  #bucketName = this.configService.get("S3_BUCKET_NAME", { infer: true });
  #S3Region = this.configService.get("S3_REGION", { infer: true });
  #S3AccessKey = this.configService.get("S3_ACCESS_KEY", { infer: true });
  #S3SecretKey = this.configService.get("S3_SECRET_KEY", { infer: true });

  private readonly clientConfig: S3ClientConfig = {
    endpoint: this.#S3Endpoint,
    region: this.#S3Region,
    credentials: {
      accessKeyId: this.#S3AccessKey,
      secretAccessKey: this.#S3SecretKey,
    },
    forcePathStyle: true,
  };

  private readonly client = new S3Client(this.clientConfig);

  /**
   * 파일을 S3에 업로드합니다.
   * @param file 컨트롤러에서 받은 Multer File
   * @returns 업로드된 파일의 키
   */
  async uploadFile(key: string, file: Express.Multer.File): Promise<string> {
    const stream = createReadStream(file.path);

    const command = new PutObjectCommand({
      Bucket: this.#bucketName,
      Key: key,
      Body: stream,
      ContentType: file.mimetype,
    });

    await this.client.send(command);

    return key;
  }
}
