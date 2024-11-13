import { User } from "@prisma/client";

import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";

import { CurrentUser } from "src/common";

import { AuthService } from "./auth.service";
import { GoogleLoginDTO } from "./dto/google.login.dto";
import { AccessGuard } from "./guards/access.guard";
import { RefreshGuard } from "./guards/refresh.guard";

@Controller("auth")
@ApiTags("Auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get("/refresh")
  @UseGuards(RefreshGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Refresh access token" })
  @ApiOkResponse({ description: "Access token refreshed" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  public async getAccessToken(@CurrentUser() { id }: Pick<User, "id">) {
    return await this.authService.generateTokens(id);
  }

  @Get("/logout")
  @UseGuards(AccessGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Logout" })
  @ApiOkResponse({ description: "Logout successful" })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  public async logout(@CurrentUser() { id }: Pick<User, "id">) {
    return await this.authService.removeRefreshToken(id);
  }

  @Post("/app/google")
  @ApiOperation({ summary: "Login with Google" })
  @ApiOkResponse({ description: "Login successful" })
  public async googleLogin(@Body() { idToken }: GoogleLoginDTO) {
    return await this.authService.googleLogin(idToken);
  }

  @Post("/app/apple")
  @ApiOperation({ summary: "Login with Apple" })
  @ApiOkResponse({ description: "Login successful" })
  public async appleLogin(@Body() { idToken }: GoogleLoginDTO) {
    return await this.authService.googleLogin(idToken);
  }
}
