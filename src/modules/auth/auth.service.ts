import { OAuth2Client } from "google-auth-library";

import { Cache } from "@nestjs/cache-manager";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

import { UserService } from "../user/user.service";

@Injectable()
export class AuthService {
  private readonly client = new OAuth2Client();

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly cacheService: Cache,
    private readonly userService: UserService,
  ) {}

  private async _generateAccessToken(id: string) {
    const token = await this.jwtService.signAsync(
      { id, type: "ACCESS" },
      { expiresIn: this.configService.get("ACCESS_TOKEN_EXPIRATION") },
    );

    return token;
  }

  private async _generateRefreshToken(id: string) {
    const token = await this.jwtService.signAsync(
      { id, type: "REFRESH" },
      { expiresIn: this.configService.get("REFRESH_TOKEN_EXPIRATION") },
    );

    await this.cacheService.set(`REFRESH/${id}`, token);

    return token;
  }

  public async generateTokens(id: string) {
    const accessToken = await this._generateAccessToken(id);
    const refreshToken = await this._generateRefreshToken(id);

    return { accessToken, refreshToken };
  }

  public async verifyAccessToken(id: string, token: string) {
    const _token = await this.jwtService.verifyAsync(token, {
      secret: this.configService.get("ACCESS_TOKEN_SECRET"),
    });

    return _token.id === id;
  }

  public async verifyRefreshToken(id: string, token: string) {
    const _token = await this.jwtService.verifyAsync(token, {
      secret: this.configService.get("REFRESH_TOKEN_SECRET"),
    });

    return (
      _token.id === id &&
      (await this.cacheService.get(`REFRESH/${id}`)) === token
    );
  }

  public async removeRefreshToken(id: string) {
    await this.cacheService.del(`REFRESH/${id}`);
  }

  public async googleLogin(idToken?: string) {
    if (!idToken)
      throw new HttpException("Missing idToken", HttpStatus.BAD_REQUEST);

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

  public async appleLogin() {}
}
