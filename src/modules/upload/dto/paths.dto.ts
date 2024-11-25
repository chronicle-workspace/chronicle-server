import { ApiProperty } from "@nestjs/swagger";

export class PathsDTO {
  @ApiProperty({ description: "S3 Paths" })
  paths: string[];
}
