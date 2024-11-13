import { $Enums } from "@prisma/client";
import { IsEnum, IsString } from "class-validator";

import { DiaryContentDTO, DiaryDTO } from "./diary.dto";

export class CreateDiaryContentDTO
  implements Pick<DiaryContentDTO, "content" | "mimetype">
{
  @IsString({ message: "Content must be a string" })
  content: string;

  @IsEnum({ enum: $Enums.Mimetype })
  mimetype: $Enums.Mimetype;
}

export class CreateDiaryDTO implements Pick<DiaryDTO, "title"> {
  @IsString({ message: "Title must be a string" })
  title: string;
}
