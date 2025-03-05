import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OfferRepositoryInterface } from './interface/offer-repository.interface';
import { OfferInterface } from './interface/offer.interface';
import { Offer } from './entities/offer.entity';

export class OfferRepository implements OfferRepositoryInterface {
  constructor(
    @InjectRepository(Offer)
    private readonly offerRepository: Repository<Offer>,
  ) {}

  create(entity: OfferInterface): Promise<OfferInterface> {
    return this.offerRepository.save(entity);
  }

  update(entity: OfferInterface): Promise<OfferInterface> {
    return this.offerRepository.save(entity);
  }

  getById(id: string): Promise<OfferInterface> {
    return this.offerRepository.findOne({
      where: { id },
      relations: ['creator', 'vacancy'],
    });
  }

  getAllByVacancyId(vacancyId: string): Promise<OfferInterface[]> {
    return this.offerRepository.find({
      where: { vacancy: { id: vacancyId } },
      relations: ['creator', 'vacancy'],
    });
  }
}
