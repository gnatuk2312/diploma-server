import { UserInterface } from 'src/modules/user/interface/user.interface';
import { VacancyStatus } from '../vacancy.enums';

export interface VacancyInterface {
  id: string;
  creator: UserInterface;
  status: VacancyStatus;
  title: string;
  description?: string;
  unitPrice: number;
  // from: AddressInterface;
  // to: AddressInterface;
  // currency: CurrencyInterface;
}
