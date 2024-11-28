import { Body, Controller, Inject, Post } from '@nestjs/common';

import { AUTH_SERVICE } from './auth.constants';
import { AuthServiceInterface } from './interface/auth-service.interface';
import { SignUpDTO } from './dto/sign-up.dto';
import { SignInDTO } from './dto/sign-in.dto';
import { RefreshTokenDTO } from './dto/refresh-token.dto';
import { AuthInterface } from './interface/auth.interface';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AUTH_SERVICE) private readonly authService: AuthServiceInterface,
  ) {}

  @Post('/sign-up')
  public async signUp(@Body() dto: SignUpDTO): Promise<AuthInterface> {
    return this.authService.signUp(dto);
  }

  @Post('/sign-in')
  public async signIn(@Body() dto: SignInDTO): Promise<AuthInterface> {
    return this.authService.signIn(dto);
  }

  @Post('/refresh-token')
  public async refreshToken(
    @Body() dto: RefreshTokenDTO,
  ): Promise<AuthInterface> {
    return this.authService.refreshToken(dto);
  }
}
