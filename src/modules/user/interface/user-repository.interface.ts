import { UserInterface } from './user.interface';

export interface UserRepositoryInterface {
  create(entity: UserInterface): Promise<UserInterface>;
  getAll(): Promise<UserInterface[]>;
  getById(id: string): Promise<UserInterface>;
  getByUsername(username: string): Promise<UserInterface>;
}
