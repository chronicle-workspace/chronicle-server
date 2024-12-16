import { Device, User } from "@prisma/client";

import { Injectable, NotFoundException } from "@nestjs/common";

import { PrismaService } from "src/common/modules/prisma/prisma.service";

import { DeviceCreateDTO } from "./dto/device.dto";
import { AlertSettingDTO } from "./dto/setting.dto";

@Injectable()
export class DeviceService {
  constructor(private readonly prisma: PrismaService) {}

  async info({ id }: Pick<User, "id">): Promise<Device | null> {
    return this.prisma.device
      .findUnique({
        where: {
          userId: id,
        },
      })
      .catch(() => {
        throw new NotFoundException("Device not found");
      });
  }

  async exists({ id }: Pick<User, "id">) {
    return (
      (await this.prisma.device.count({
        where: {
          userId: id,
        },
      })) > 0
    );
  }

  async register(
    { id }: Pick<User, "id">,
    { fcmToken, deviceId, deviceName }: DeviceCreateDTO,
  ) {
    return this.prisma.device.upsert({
      where: {
        userId: id,
      },
      update: {
        fcmToken,
        deviceId,
        deviceName,
      },
      create: {
        userId: id,
        deviceId,
        fcmToken,
        deviceName,
      },
    });
  }

  async updateSetting(
    { id }: Pick<User, "id">,
    { isAllowed }: AlertSettingDTO,
  ) {
    return this.prisma.device
      .update({
        where: {
          userId: id,
        },
        data: {
          isAllowed,
        },
      })
      .catch(() => {
        throw new NotFoundException("Device not found");
      });
  }
}
