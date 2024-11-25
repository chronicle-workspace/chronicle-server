import { User } from "@prisma/client";
import { diskStorage } from "multer";
import { extname } from "path";
import { v4 } from "uuid";

import {
  Controller,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";

import { CurrentUser } from "src/common";

import { AccessGuard } from "../auth/guards/access.guard";
import { PathsDTO } from "./dto/paths.dto";
import { UploadService } from "./upload.service";

@Controller("upload")
@ApiTags("Upload")
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseGuards(AccessGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Upload files" })
  @ApiOkResponse({ description: "S3 Paths", type: PathsDTO })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(
    FilesInterceptor("files", null, {
      storage: diskStorage({
        destination: "./uploads",
        filename: (_, file, cb) =>
          cb(null, `${v4()}${extname(file.originalname)}`),
      }),
    }),
  )
  async uploadFiles(
    @CurrentUser() user: User,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return await this.uploadService.uploadFiles(user.id, files);
  }
}
