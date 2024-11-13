import { User } from "@prisma/client";

import { Controller, Delete, Get, UseGuards } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";

import { CurrentUser } from "src/common";

import { AccessGuard } from "../auth/guards/access.guard";
import { UserDTO } from "./dto/user.dto";
import { UserService } from "./user.service";

@Controller("user")
@ApiTags("User")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("/")
  @UseGuards(AccessGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get user profile" })
  @ApiOkResponse({ description: "User profile retrieved", type: UserDTO })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  public getProfile(@CurrentUser() user: User) {
    return user;
  }

  @Delete("/")
  @UseGuards(AccessGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Delete user profile" })
  @ApiOkResponse({ description: "User profile deleted" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  public deleteProfile(@CurrentUser() { id }: Pick<User, "id">) {
    return this.userService.delete(id);
  }
}
