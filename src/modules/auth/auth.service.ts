import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';

import { AuthServiceInterface } from './interface/auth-service.interface';
import { USER_SERVICE } from '../user/user.constants';
import { UserServiceInterface } from '../user/interface/user-service.interface';
import { AuthInterface } from './interface/auth.interface';
import { SignUpDTO } from './dto/sign-up.dto';
import { SignInDTO } from './dto/sign-in.dto';
import { RefreshTokenDTO } from './dto/refresh-token.dto';
import { TOKEN_SERVICE } from './auth.constants';
import { TokenService } from './token.service';
import { UserInterface } from '../user/interface/user.interface';
import { TokensInterface } from './interface/tokens.interface';

@Injectable()
export class AuthService implements AuthServiceInterface {
  constructor(
    @Inject(USER_SERVICE) private readonly userService: UserServiceInterface,
    @Inject(TOKEN_SERVICE) private readonly tokenService: TokenService,
  ) {}

  private constructAuthResponse(
    tokens: TokensInterface,
    user: UserInterface,
  ): AuthInterface {
    return { ...tokens, user };
  }

  async signUp(dto: SignUpDTO): Promise<AuthInterface> {
    if (await this.userService.findByUsername(dto.username)) {
      throw new BadRequestException('This username is already taken');
    }

    const user = await this.userService.create(dto);

    return this.constructAuthResponse(this.tokenService.signTokens(user), user);
  }

  async signIn(dto: SignInDTO): Promise<AuthInterface> {
    const { username, password } = dto;

    const user = await this.userService.findByUsername(username);
    if (!user) throw new BadRequestException('Wrong credentials');

    const isValidPassword = await compare(password, user.password);
    if (!isValidPassword) throw new BadRequestException('Wrong credentials');

    return this.constructAuthResponse(this.tokenService.signTokens(user), user);
  }

  async refreshToken(dto: RefreshTokenDTO): Promise<AuthInterface> {
    const JWTPayload = this.tokenService.verifyRefreshToken(dto.refreshToken);

    const user = await this.userService.findById(JWTPayload.userId);

    return this.constructAuthResponse(this.tokenService.signTokens(user), user);
  }
}
