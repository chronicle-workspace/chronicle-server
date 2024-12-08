import { $Enums, Diary, DiaryContent } from "@prisma/client";
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsNumberString,
  IsString,
  Length,
} from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class DiaryContentDTO implements Partial<DiaryContent> {
  @IsString({ message: "ID must be a string" })
  @ApiProperty({ description: "내용 ID" })
  id?: string;

  @IsNumber({}, { message: "Order must be a number" })
  @ApiProperty({ description: "내용 순서" })
  order?: number;

  @IsString({ message: "Content must be a string" })
  @ApiProperty({ description: "일기 내용" })
  content: string;

  @IsEnum($Enums.Mimetype)
  @ApiProperty({ description: "내용 MIME 타입", enum: $Enums.Mimetype })
  mimetype: $Enums.Mimetype;

  @ApiProperty({ description: "내용 생성일" })
  createdAt: Date;
}

export class DiaryDTO implements Partial<Diary> {
  @ApiProperty({ description: "일기 ID" })
  id: string;

  @ApiProperty({ description: "일기 제목" })
  @IsString({ message: "Title must be a string" })
  title: string;

  @ApiProperty({ description: "일기 잠금 여부" })
  @IsBoolean({ message: "isLocked must be a boolean" })
  isLocked: boolean;

  @ApiProperty({ description: "일기 비밀번호" })
  @Length(4, 4, { message: "Password must be 4 characters" })
  @IsNumberString({}, { message: "Password must be a number string" })
  password?: string;

  @ApiProperty({ description: "일기 생성일" })
  createdAt: Date;

  @ApiProperty({ description: "일기 수정일" })
  updatedAt: Date;
}

export class GetDiaryDTO extends DiaryDTO {
  @ApiProperty({ description: "일기 내용", type: [DiaryContentDTO] })
  contents: DiaryContentDTO[];
}

export class GetDiariesDTO {
  @ApiProperty({ description: "일기 목록", type: [GetDiaryDTO] })
  diaries: GetDiaryDTO[];

  @ApiProperty({ description: "다음 페이지", type: Number })
  nextCursor: number | null;
}
