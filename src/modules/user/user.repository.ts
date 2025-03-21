import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserRepositoryInterface } from './interface/user-repository.interface';
import { User } from './entities/user.entity';
import { UserInterface } from './interface/user.interface';

export class UserRepository implements UserRepositoryInterface {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  public create(entity: UserInterface): Promise<UserInterface> {
    return this.userRepository.save(entity);
  }

  public findAll(): Promise<UserInterface[]> {
    return this.userRepository.find();
  }

  public findById(id: string): Promise<UserInterface> {
    return this.userRepository.findOne({ where: { id } });
  }

  public findByUsername(username: string): Promise<UserInterface> {
    return this.userRepository.findOne({ where: { username } });
  }
}
