import { PickType } from "@nestjs/swagger";

import { DiaryContentDTO, DiaryDTO } from "./diary.dto";

export class CreateDiaryContentDTO extends PickType(DiaryContentDTO, [
  "content",
  "mimetype",
]) {}

export class CreateDiaryDTO extends PickType(DiaryDTO, ["title"]) {}
