import { UserInterface } from './user.interface';

export interface UserRepositoryInterface {
  create(entity: UserInterface): Promise<UserInterface>;
  findAll(): Promise<UserInterface[]>;
  findById(id: string): Promise<UserInterface>;
  findByUsername(username: string): Promise<UserInterface>;
}
