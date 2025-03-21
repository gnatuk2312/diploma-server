import { FileInterface } from 'src/modules/file/interface/file.interface';
import { UserInterface } from 'src/modules/user/interface/user.interface';

export interface DriverDetailsInterface {
  id: string;
  user: UserInterface;
  description: string | null;
  email: string | null;
  phoneNumber: string | null;
  driverLicense: FileInterface | null;
}
