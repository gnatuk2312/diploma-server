import { UserInterface } from 'src/modules/user/interface/user.interface';
import { VacancyInterface } from 'src/modules/vacancy/interface/vacancy.interface';

export interface OfferInterface {
  id: string;
  vacancy: VacancyInterface;
  creator: UserInterface;
  comment: string | null;
  acceptedAt: Date | null;
}
