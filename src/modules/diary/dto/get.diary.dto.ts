import { ApiProperty } from "@nestjs/swagger";

import { DiaryContentDTO, DiaryDTO } from "./diary.dto";

export class GetDiaryDTO extends DiaryDTO {
  @ApiProperty({ description: "일기 내용", type: [DiaryContentDTO] })
  contents: DiaryContentDTO[];
}
