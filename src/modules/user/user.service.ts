import { $Enums } from "@prisma/client";

import { Injectable } from "@nestjs/common";

import { PrismaService } from "src/common/modules/prisma/prisma.service";

import { CreateUserDTO } from "./dto/create.user.dto";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

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
}
