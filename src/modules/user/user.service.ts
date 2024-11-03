import { $Enums } from "@prisma/client";
import { hash } from "bcrypt";

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

  public async findOneByEmailAndPassword(email: string, password: string) {
    return await this.prisma.user.findFirst({
      where: {
        email,
        password: await hash(password, 10),
      },
    });
  }

  public async create(data: CreateUserDTO) {
    return await this.prisma.user.create({ data });
  }
}
