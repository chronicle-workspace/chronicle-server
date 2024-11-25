import { Cache } from "cache-manager";
import { OAuth2Client } from "google-auth-library";
import ms from "ms";

import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

import appleOAuthDecrypt from "src/common/utils/apple/decrypt";

import { UserService } from "../user/user.service";

@Injectable()
export class AuthService {
  private readonly client = new OAuth2Client();

  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheService: Cache,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {}

  private async _generateAccessToken(id: string) {
    const token = await this.jwtService.signAsync(
      { id, type: "ACCESS" },
      {
        secret: this.configService.get("JWT_SECRET"),
        expiresIn: this.configService.get("ACCESS_TOKEN_EXPIRATION"),
      },
    );

    return token;
  }

  private async _generateRefreshToken(id: string) {
    const token = await this.jwtService.signAsync(
      { id, type: "REFRESH" },
      {
        secret: this.configService.get("JWT_SECRET"),
        expiresIn: this.configService.get("REFRESH_TOKEN_EXPIRATION"),
      },
    );

    await this.cacheService.set(
      `REFRESH/${id}`,
      token,
      ms(this.configService.get<string>("REFRESH_TOKEN_EXPIRATION")),
    );

    return token;
  }

  public async generateTokens(id: string) {
    const accessToken = await this._generateAccessToken(id);
    const refreshToken = await this._generateRefreshToken(id);

    return { accessToken, refreshToken };
  }

  public async verifyAccessToken(id: string, token: string) {
    const _token = await this.jwtService.verifyAsync(token, {
      secret: this.configService.get("JWT_SECRET"),
    });

    return _token.id === id;
  }

  public async verifyRefreshToken(id: string, token: string) {
    return (await this.cacheService.get(`REFRESH/${id}`)) === token;
  }

  public async removeRefreshToken(id: string) {
    await this.cacheService.del(`REFRESH/${id}`);
  }

  public async googleLogin(idToken: string) {
    const ticket = await this.client.verifyIdToken({
      idToken,
    });

    const payload = ticket.getPayload();

    let user = await this.userService.findOneByProvider("GOOGLE", payload.sub);

    if (!user)
      user = await this.userService.create({
        email: payload.email,
        provider: "GOOGLE",
        providerId: payload.sub,
      });

    return await this.generateTokens(user.id);
  }

  public async appleLogin(idToken: string) {
    const appleUser = await appleOAuthDecrypt(idToken);

    let user = await this.userService.findOneByProvider("APPLE", appleUser.sub);

    if (!user)
      user = await this.userService.create({
        email: appleUser.email ?? "",
        provider: "APPLE",
        providerId: appleUser.sub,
      });

    return await this.generateTokens(user.id);
  }
}
