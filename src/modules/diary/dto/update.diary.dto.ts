import { PartialType } from "@nestjs/swagger";

import { CreateDiaryContentDTO, CreateDiaryDTO } from "./create.diary.dto";

export class UpdateDiaryDTO extends CreateDiaryDTO {}

export class UpdateDiaryContentDTO extends PartialType(CreateDiaryContentDTO) {}
