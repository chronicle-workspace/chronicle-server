import { User } from "@prisma/client";

import { Body, Controller, Get, Put, UseGuards } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";

import { CurrentUser } from "src/common";

import { AccessGuard } from "../auth/guards/access.guard";
import { DeviceService } from "./device.service";
import { DeviceCreateDTO } from "./dto/device.dto";
import { ExistsDTO } from "./dto/exists.dto";
import { DeviceInfoDTO } from "./dto/info.dto";

@ApiTags("device")
@Controller("device")
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Get("info")
  @UseGuards(AccessGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get user device infomation" })
  @ApiOkResponse({ description: "User Device Infomation", type: DeviceInfoDTO })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  async info(@CurrentUser() user: User) {
    return { device: await this.deviceService.info(user) };
  }

  @Get("exists")
  @UseGuards(AccessGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get user profile" })
  @ApiOkResponse({ description: "User profile retrieved", type: ExistsDTO })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  async exists(@CurrentUser() user: User) {
    return { isExists: await this.deviceService.exists(user) };
  }

  @Put("register")
  @UseGuards(AccessGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Register user device" })
  @ApiOkResponse({ description: "User device registered", type: DeviceInfoDTO })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  async register(@CurrentUser() user: User, @Body() device: DeviceCreateDTO) {
    return {
      device: (await this.deviceService.register(user, device)) ?? null,
    };
  }
}
