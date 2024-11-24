import { User } from "@prisma/client";

import { Injectable } from "@nestjs/common";

import { PrismaService } from "src/common/modules/prisma/prisma.service";

import { CreateDiaryContentDTO, CreateDiaryDTO } from "./dto/create.diary.dto";
import { UpdateDiaryContentDTO, UpdateDiaryDTO } from "./dto/update.diary.dto";

@Injectable()
export class DiaryService {
  constructor(private readonly prismaService: PrismaService) {}

  public async findAll(user: User, page: number, limit: number) {
    page = page || 1;
    limit = limit || 10;

    const diaries = await this.prismaService.diary.findMany({
      select: {
        id: true,
        title: true,
        isLocked: true,
        password: true,
        createdAt: true,
        updatedAt: true,
      },
      where: { userId: user.id },
      take: limit,
      skip: (page - 1) * limit,
      orderBy: { createdAt: "desc" },
    });

    const total = await this.prismaService.diary.count({
      where: { userId: user.id },
    });

    return { diaries, nextCursor: page * limit < total ? page + 1 : null };
  }

  public async findOne(id: string) {
    return await this.prismaService.diary.findUnique({
      where: { id },
      include: {
        contents: {
          orderBy: { order: "asc" },
        },
      },
    });
  }

  public async create(user: User, body: CreateDiaryDTO) {
    return await this.prismaService.diary.create({
      data: {
        ...body,
        user: { connect: { id: user.id } },
      },
    });
  }

  public async update(id: string, body: UpdateDiaryDTO) {
    return await this.prismaService.diary.update({
      where: { id },
      data: body,
    });
  }

  public async createContent(diaryId: string, body: CreateDiaryContentDTO) {
    return await this.prismaService.diaryContent.create({
      data: {
        ...body,
        diary: { connect: { id: diaryId } },
      },
    });
  }

  public async updateContent(
    diaryId: string,
    contentId: string,
    body: UpdateDiaryContentDTO,
  ) {
    return await this.prismaService.diaryContent.update({
      where: { id: contentId, diaryId },
      data: body,
    });
  }

  public async updateContentOrder(id: string, order: number) {
    return await this.prismaService.diaryContent.update({
      where: { id },
      data: { order },
    });
  }
}
