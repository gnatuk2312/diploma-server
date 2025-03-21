import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';

import { CreateUserDTO } from './dto/create-user.dto';
import { USER_SERVICE } from './user.constants';
import { UserServiceInterface } from './interface/user-service.interface';
import { UserInterface } from './interface/user.interface';
import { AuthGuard } from '../auth/auth.guard';

@Controller('users')
export class UserController {
  constructor(
    @Inject(USER_SERVICE) private readonly userService: UserServiceInterface,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() dto: CreateUserDTO): Promise<UserInterface> {
    return this.userService.create(dto);
  }

  @Get()
  getAll(): Promise<UserInterface[]> {
    return this.userService.getAll();
  }

  @Get('/:id')
  getById(@Param('id') id: string): Promise<UserInterface> {
    return this.userService.getById(id);
  }
}
