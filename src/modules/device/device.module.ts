import { Module } from "@nestjs/common";

import { PrismaModule } from "src/common";

import { DeviceController } from "./device.controller";
import { DeviceService } from "./device.service";

@Module({
  imports: [PrismaModule],
  controllers: [DeviceController],
  providers: [DeviceService],
})
export class DeviceModule {}
