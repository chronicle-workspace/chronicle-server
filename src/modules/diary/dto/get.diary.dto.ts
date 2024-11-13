import { ApiProperty } from "@nestjs/swagger";

import { DiaryContentDTO, DiaryDTO } from "./diary.dto";

export class GetDiaryContentDTO extends DiaryDTO {
  @ApiProperty({ description: "일기 내용", type: [DiaryContentDTO] })
  contents: DiaryContentDTO[];
}
