import { UserInterface } from 'src/modules/user/interface/user.interface';

export interface VehicleInterface {
  id: string;
  driver: UserInterface;
  //   registration: FileInterface;
  brand: string;
  model: string | null;
  kilometrage: number;
}
