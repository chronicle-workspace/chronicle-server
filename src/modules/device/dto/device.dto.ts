import { Device } from "@prisma/client";
import { IsBoolean, IsString } from "class-validator";

import { ApiProperty, PickType } from "@nestjs/swagger";

export class DeviceDTO implements Device {
  @ApiProperty({ description: "User ID" })
  userId: string;

  @IsString()
  @ApiProperty({ description: "FCM Token" })
  fcmToken: string;

  @IsString()
  @ApiProperty({ description: "Device Name" })
  deviceName: string;

  @IsBoolean()
  @ApiProperty({ description: "Alert 허용 여부" })
  isAllowed: boolean;

  @ApiProperty({ description: "생성일" })
  createdAt: Date;

  @ApiProperty({ description: "수정일" })
  updatedAt: Date;
}

export class DeviceCreateDTO extends PickType(DeviceDTO, [
  "fcmToken",
  "deviceName",
]) {}
