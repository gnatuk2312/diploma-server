import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { hash } from 'bcrypt';

import { UserServiceInterface } from './interface/user-service.interface';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserInterface } from './interface/user.interface';
import { User } from './entities/user.entity';
import { USER_REPOSITORY } from './user.constants';
import { UserRepositoryInterface } from './interface/user-repository.interface';

@Injectable()
export class UserService implements UserServiceInterface {
  private readonly hashSalt = 5;

  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async create(dto: CreateUserDTO): Promise<UserInterface> {
    const { username, password, role } = dto;

    if (await this.userRepository.getByUsername(username)) {
      throw new BadRequestException('This username is already taken');
    }

    const user = new User();

    user.username = username;
    user.password = await hash(password, this.hashSalt);
    user.role = role;

    return this.userRepository.create(user);
  }

  getAll(): Promise<UserInterface[]> {
    return this.userRepository.getAll();
  }

  async getById(id: string): Promise<UserInterface> {
    const user = await this.userRepository.getById(id);

    if (!user) throw new NotFoundException();

    return user;
  }

  getByUsername(username: string): Promise<UserInterface> {
    return this.userRepository.getByUsername(username);
  }
}
