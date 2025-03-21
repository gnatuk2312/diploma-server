import { CreateUserDTO } from '../dto/create-user.dto';
import { UserInterface } from './user.interface';

export interface UserServiceInterface {
  create(dto: CreateUserDTO): Promise<UserInterface>;
  getAll(): Promise<UserInterface[]>;
  getById(id: string): Promise<UserInterface>;
  getByUsername(username: string): Promise<UserInterface>;
}
