import { PartialType, PickType } from "@nestjs/swagger";

import { CreateDiaryContentDTO } from "./create.diary.dto";
import { DiaryDTO } from "./diary.dto";

export class UpdateDiaryDTO extends PartialType(
  PickType(DiaryDTO, ["password", "title"]),
) {}

export class UpdateDiaryContentDTO extends PartialType(CreateDiaryContentDTO) {}
