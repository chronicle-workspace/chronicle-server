import { Module } from "@nestjs/common";

import { PrismaModule } from "src/common";

import { DiaryController } from "./diary.controller";
import { DiaryService } from "./diary.service";

@Module({
  imports: [PrismaModule],
  controllers: [DiaryController],
  providers: [DiaryService],
})
export class DiaryModule {}
