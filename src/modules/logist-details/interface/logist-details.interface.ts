import { UserInterface } from 'src/modules/user/interface/user.interface';

export interface LogistDetailsInterface {
  id: string;
  user: UserInterface;
  description: string;
  email: string;
  phoneNumber: string;
}
