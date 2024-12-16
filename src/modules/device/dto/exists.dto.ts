import { ApiProperty } from "@nestjs/swagger";

export class ExistsDTO {
  @ApiProperty({ description: "Is exists" })
  isExists: boolean;
}
