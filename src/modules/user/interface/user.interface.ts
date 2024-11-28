import { UserRole } from '../user.enums';

export interface UserInterface {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  password: string;
  role: UserRole;
}
