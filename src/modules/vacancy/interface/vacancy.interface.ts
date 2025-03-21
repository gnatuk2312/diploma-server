import { UserInterface } from 'src/modules/user/interface/user.interface';
import { VacancyStatus } from '../vacancy.enums';
import { AddressInterface } from 'src/modules/address/interface/address.interface';
import { OfferInterface } from 'src/modules/offer/interface/offer.interface';

export interface VacancyInterface {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  creator: UserInterface;
  status: VacancyStatus;
  title: string;
  description: string | null;
  unitPrice: number;
  from: AddressInterface;
  to: AddressInterface;
  offers?: OfferInterface[];
  // currency: CurrencyInterface;
}
