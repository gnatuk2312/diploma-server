import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { UserInterface } from '../user/interface/user.interface';
import { JWTPayloadInterface } from './interface/jwt-payload.interface';
import { TokensInterface } from './interface/tokens.interface';

// TODO: create a separate module for this logic
@Injectable()
export class TokenService {
  private readonly accessTokenSecret: string;
  private readonly refreshTokenSecret: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    this.accessTokenSecret = this.configService.get('jwt.accessTokenSecret');
    this.refreshTokenSecret = this.configService.get('jwt.refreshTokenSecret');
  }

  private createJWTPayload(user: UserInterface): JWTPayloadInterface {
    return { userId: user.id };
  }

  private signAccessToken(payload: JWTPayloadInterface): string {
    return this.jwtService.sign(payload, {
      secret: this.accessTokenSecret,
      expiresIn: '3h',
    });
  }

  private signRefreshToken(payload: JWTPayloadInterface): string {
    return this.jwtService.sign(payload, {
      secret: this.refreshTokenSecret,
      expiresIn: '10d',
    });
  }

  signTokens(user: UserInterface): TokensInterface {
    const payload = this.createJWTPayload(user);

    const accessToken = this.signAccessToken(payload);
    const refreshToken = this.signRefreshToken(payload);

    return { accessToken, refreshToken };
  }

  verifyRefreshToken(token: string): JWTPayloadInterface {
    try {
      return this.jwtService.verify(token, { secret: this.refreshTokenSecret });
    } catch (error) {
      throw new UnauthorizedException('Refresh token is not valid');
    }
  }
}
