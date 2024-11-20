import { IsString } from "class-validator";

import { ApiProperty, PickType } from "@nestjs/swagger";

import { DiaryContentDTO, DiaryDTO } from "./diary.dto";

export class CreateDiaryContentDTO extends PickType(DiaryContentDTO, [
  "content",
  "mimetype",
]) {}

export class CreateDiaryDTO extends PickType(DiaryDTO, ["title"]) {}

export class CreateDiaryResponseDTO {
  @IsString()
  @ApiProperty({ description: "Diary Id" })
  id: string;
}
