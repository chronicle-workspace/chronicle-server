import { ApiProperty } from "@nestjs/swagger";

export class PathsDTO {
  @ApiProperty({ description: "S3 Public URL" })
  url: string;

  @ApiProperty({ description: "S3 Paths" })
  paths: string[];
}
