import { OfferInterface } from './offer.interface';
import { CreateOfferDTO } from '../dto/create-offer.dto';

export interface OfferServiceInterface {
  create(dto: CreateOfferDTO): Promise<OfferInterface>;
  getById(id: string): Promise<OfferInterface>;
  getAllByVacancyId(vacancyId: string): Promise<OfferInterface[]>;
  accept(id: string): Promise<OfferInterface>;
}
