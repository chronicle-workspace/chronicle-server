import { Injectable } from "@nestjs/common";

import { S3Service } from "src/common/modules/s3/s3.service";

@Injectable()
export class UploadService {
  constructor(private readonly s3Service: S3Service) {}

  async uploadFiles(id: string, files: Array<Express.Multer.File>) {
    return {
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
