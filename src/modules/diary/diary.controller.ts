import { User } from "@prisma/client";

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";

import { CurrentUser } from "src/common";

import { AccessGuard } from "../auth/guards/access.guard";
import { DiaryService } from "./diary.service";
import {
  CreateDiaryContentDTO,
  CreateDiaryDTO,
  CreateDiaryResponseDTO,
} from "./dto/create.diary.dto";
import { GetDiariesDTO } from "./dto/diary.dto";
import { GetDiaryDTO } from "./dto/get.diary.dto";
import { UpdateDiaryContentDTO, UpdateDiaryDTO } from "./dto/update.diary.dto";

@Controller("diary")
@ApiTags("Diary")
export class DiaryController {
  constructor(private readonly diaryService: DiaryService) {}

  @Get("/")
  @UseGuards(AccessGuard)
  @ApiBearerAuth()
  @ApiQuery({ name: "page", required: false })
  @ApiQuery({ name: "limit", required: false })
  @ApiOperation({ summary: "Get all diaries" })
  @ApiOkResponse({ description: "Return all diaries", type: GetDiariesDTO })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  public async findAll(
    @CurrentUser() user: User,
    @Query("page") page: number,
    @Query("limit") limit: number,
  ) {
    return await this.diaryService.findAll(user, page, limit);
  }

  @Get("/:diaryId")
  @UseGuards(AccessGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get diary" })
  @ApiOkResponse({ description: "Return diary", type: GetDiaryDTO })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  public async findOne(@Param("diaryId") diaryId: string) {
    return await this.diaryService.findOne(diaryId);
  }

  @Post("/")
  @UseGuards(AccessGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Create diary" })
  @ApiOkResponse({ description: "Diary created", type: CreateDiaryResponseDTO })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  public async create(@CurrentUser() user: User, @Body() body: CreateDiaryDTO) {
    return await this.diaryService.create(user, body);
  }

  @Patch("/:diaryId")
  @UseGuards(AccessGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Update diary" })
  @ApiOkResponse({ description: "Diary updated" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  public async update(
    @Param("diaryId") diaryId: string,
    @Body() body: UpdateDiaryDTO,
  ) {
    return await this.diaryService.update(diaryId, body);
  }

  @Put("/:diaryId/content")
  @UseGuards(AccessGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Create diary content" })
  @ApiOkResponse({ description: "Diary content created" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  public async createContent(
    @Param("diaryId") diaryId: string,
    @Body() body: CreateDiaryContentDTO,
  ) {
    return await this.diaryService.createContent(diaryId, body);
  }

  @Patch("/:diaryId/content/:contentId")
  @UseGuards(AccessGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Update diary content" })
  @ApiOkResponse({ description: "Diary content updated" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  public async updateContent(
    @Param("diaryId") diaryId: string,
    @Param("contentId") contentId: string,
    @Body() body: UpdateDiaryContentDTO,
  ) {
    return await this.diaryService.updateContent(diaryId, contentId, body);
  }

  @Delete("/:diaryId/content/:contentId")
  @UseGuards(AccessGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Delete diary content" })
  @ApiOkResponse({ description: "Diary content deleted" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  public async deleteContent(
    @Param("diaryId") diaryId: string,
    @Param("contentId") contentId: string,
  ) {
    return await this.diaryService.deleteContent(diaryId, contentId);
  }
}
