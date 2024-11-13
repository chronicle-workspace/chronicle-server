import { User } from "@prisma/client";

import {
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from "@nestjs/common";
import {
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";

import { CurrentUser } from "src/common";

import { AccessGuard } from "../auth/guards/access.guard";
import { DiaryService } from "./diary.service";
import { CreateDiaryContentDTO, CreateDiaryDTO } from "./dto/create.diary.dto";
import { UpdateDiaryContentDTO } from "./dto/update.diary.dto";

@Controller("diary")
@ApiTags("Diary")
export class DiaryController {
  constructor(private readonly diaryService: DiaryService) {}

  @Get("/")
  @UseGuards(AccessGuard)
  @ApiOperation({ summary: "Get all diaries" })
  @ApiOkResponse({ description: "Return all diaries" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  public async findAll(
    @CurrentUser() user: User,
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 10,
  ) {
    return await this.diaryService.findAll(user, page, limit);
  }

  @Get("/:diaryId")
  @UseGuards(AccessGuard)
  @ApiOperation({ summary: "Get diary" })
  @ApiOkResponse({ description: "Return diary" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  public async findOne(@Param("diaryId") diaryId: string) {
    return await this.diaryService.findOne(diaryId);
  }

  @Post("/")
  @UseGuards(AccessGuard)
  @ApiOperation({ summary: "Create diary" })
  @ApiOkResponse({ description: "Diary created" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  public async create(
    @CurrentUser() user: User,
    @Query() body: CreateDiaryDTO,
  ) {
    return await this.diaryService.create(user, body);
  }

  @Put("/:diaryId/content")
  @UseGuards(AccessGuard)
  @ApiOperation({ summary: "Create diary content" })
  @ApiOkResponse({ description: "Diary content created" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  public async createContent(
    @Param("diaryId") diaryId: string,
    @Query() body: CreateDiaryContentDTO,
  ) {
    return await this.diaryService.createContent(diaryId, body);
  }

  @Patch("/:diaryId/content/:contentId")
  @UseGuards(AccessGuard)
  @ApiOperation({ summary: "Update diary content" })
  @ApiOkResponse({ description: "Diary content updated" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  public async updateContent(
    @Param("diaryId") diaryId: string,
    @Param("contentId") contentId: string,
    @Query() body: UpdateDiaryContentDTO,
  ) {
    return await this.diaryService.updateContent(diaryId, contentId, body);
  }
}
