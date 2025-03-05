import { OfferInterface } from './offer.interface';

export interface OfferRepositoryInterface {
  create(entity: OfferInterface): Promise<OfferInterface>;
  update(entity: OfferInterface): Promise<OfferInterface>;
  getById(id: string): Promise<OfferInterface>;
  getAllByVacancyId(vacancyId: string): Promise<OfferInterface[]>;
}
