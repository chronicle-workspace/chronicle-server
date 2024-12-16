import { $Enums } from "@prisma/client";
import { shuffle } from "lodash";

import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Cron, CronExpression } from "@nestjs/schedule";

import { FirebaseService } from "src/common/modules/firebase/firebase.service";
import { PrismaService } from "src/common/modules/prisma/prisma.service";

import { CreateUserDTO } from "./dto/create.user.dto";

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
    private readonly firebase: FirebaseService,
  ) {}

  public async findOneByProvider(
    provider: $Enums.Provider,
    providerId: string,
  ) {
    return await this.prisma.user.findFirst({
      where: {
        provider,
        providerId,
      },
    });
  }

  public async findOneById(id: string) {
    return await this.prisma.user.findFirst({
      where: {
        id,
      },
    });
  }

  public async findOneByEmail(email: string) {
    return await this.prisma.user.findFirst({
      where: {
        email,
      },
    });
  }

  public async create(data: CreateUserDTO) {
    return await this.prisma.user.create({ data });
  }

  public async delete(id: string) {
    return await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  @Cron(CronExpression.EVERY_DAY_AT_10PM)
  public async sendDiaryAlerts() {
    const users = await this.prisma.user.findMany({
      include: {
        Device: {
          select: {
            fcmToken: true,
          },
        },
      },
      where: {
        Device: {
          isAllowed: true,
        },
        diaries: {
          none: {
            createdAt: {
              gte: new Date(new Date().setHours(2, 0, 0, 0)), // 2AM ~ 10PM
            },
          },
        },
      },
    });

    let message: string = "오늘 일기를 작성해볼까요?";
    try {
      const text = await fetch(this.config.get<string>("MESSAGE_URL"), {
        method: "GET",
        headers: {
          "User-Agent": "curl",
        },
      }).then((res) => res.text());

      if (text.length > 0) message = shuffle(text.split("//"))[0].trim();
    } catch (error) {
      console.error(error);
    }

    users.forEach(({ Device }) =>
      this.firebase.sendNotificationByToken({
        token: Device.fcmToken,
        title: "Chronicle 리마인더",
        body: message,
      }),
    );
  }
}
