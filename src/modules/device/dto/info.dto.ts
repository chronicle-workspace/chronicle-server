import { ApiProperty } from "@nestjs/swagger";

import { DeviceDTO } from "./device.dto";

export class DeviceInfoDTO {
  @ApiProperty({ description: "Device Info" })
  device: DeviceDTO | null;
}
