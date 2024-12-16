import { Device, User } from "@prisma/client";

import { Injectable } from "@nestjs/common";

import { PrismaService } from "src/common/modules/prisma/prisma.service";

import { DeviceCreateDTO } from "./dto/device.dto";

@Injectable()
export class DeviceService {
  constructor(private readonly prisma: PrismaService) {}

  async info({ id }: Pick<User, "id">): Promise<Device | null> {
    return this.prisma.device.findUnique({
      where: {
        userId: id,
      },
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
    { fcmToken, deviceName }: DeviceCreateDTO,
  ) {
    return this.prisma.device.upsert({
      where: {
        userId: id,
      },
      update: {
        fcmToken,
        deviceName,
      },
      create: {
        userId: id,
        fcmToken,
        deviceName,
      },
    });
  }
}