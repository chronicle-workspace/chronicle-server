import { $Enums, Diary, DiaryContent } from "@prisma/client";

import { ApiProperty } from "@nestjs/swagger";

export class DiaryDTO implements Partial<Diary> {
  @ApiProperty({ description: "일기 ID" })
  id: string;

  @ApiProperty({ description: "일기 제목" })
  title: string;

  @ApiProperty({ description: "일기 잠금 여부" })
  isLocked: boolean;

  @ApiProperty({ description: "일기 비밀번호" })
  password?: string;

  @ApiProperty({ description: "일기 생성일" })
  createdAt: Date;

  @ApiProperty({ description: "일기 수정일" })
  updatedAt: Date;
}

export class DiaryContentDTO implements Partial<DiaryContent> {
  @ApiProperty({ description: "내용 순서" })
  order?: number;

  @ApiProperty({ description: "일기 내용" })
  content: string;

  @ApiProperty({ description: "내용 MIME 타입", enum: $Enums.Mimetype })
  mimetype: $Enums.Mimetype;

  @ApiProperty({ description: "내용 생성일" })
  createdAt: Date;
}
