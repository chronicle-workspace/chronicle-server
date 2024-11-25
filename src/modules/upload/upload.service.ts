import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { S3Service } from "src/common/modules/s3/s3.service";

@Injectable()
export class UploadService {
  constructor(
    private readonly s3Service: S3Service,
    private readonly config: ConfigService,
  ) {}

  async uploadFiles(id: string, files: Array<Express.Multer.File>) {
    return {
      url: this.config.get<string>("S3_PUBLIC_URL"),
      paths: await Promise.all(
        files.map(
          async (file) =>
            await this.s3Service.uploadFile(
              `uploads/${id}/${file.filename}`,
              file,
            ),
        ),
      ),
    };
  }
}
