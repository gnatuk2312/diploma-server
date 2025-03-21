import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';

import { CreateOfferDTO } from './dto/create-offer.dto';
import { OfferServiceInterface } from './interface/offer-service.interface';
import { OfferInterface } from './interface/offer.interface';
import { OFFER_REPOSITORY } from './offer.constants';
import { OfferRepositoryInterface } from './interface/offer-repository.interface';
import { VACANCY_SERVICE } from '../vacancy/vacancy.constants';
import { VacancyServiceInterface } from '../vacancy/interface/vacancy-service.interface';
import { USER_SERVICE } from '../user/user.constants';
import { UserServiceInterface } from '../user/interface/user-service.interface';
import { Offer } from './entities/offer.entity';

export class OfferService implements OfferServiceInterface {
  constructor(
    @Inject(OFFER_REPOSITORY)
    private readonly offerRepository: OfferRepositoryInterface,
    @Inject(VACANCY_SERVICE)
    private readonly vacancyService: VacancyServiceInterface,
    @Inject(USER_SERVICE)
    private readonly userService: UserServiceInterface,
  ) {}

  async create(dto: CreateOfferDTO): Promise<OfferInterface> {
    const { creatorId, vacancyId, comment } = dto;

    const creator = await this.userService.getById(creatorId);
    if (!creator) throw new BadRequestException('User does not exist');

    const vacancy = await this.vacancyService.getById(vacancyId);
    if (!vacancy) throw new BadRequestException('Vacancy does not exist');

    const offer = new Offer();

    offer.creator = creator;
    offer.vacancy = vacancy;
    offer.comment = comment;

    return this.offerRepository.create(offer);
  }

  getById(id: string): Promise<OfferInterface> {
    return this.offerRepository.getById(id);
  }

  getAllByVacancyId(vacancyId: string): Promise<OfferInterface[]> {
    return this.offerRepository.getAllByVacancyId(vacancyId);
  }

  async accept(id: string): Promise<OfferInterface> {
    const offer = await this.offerRepository.getById(id);
    if (!offer) throw new NotFoundException('Offer does not exist');

    offer.acceptedAt = new Date();

    await this.vacancyService.markAsInProgress(offer.vacancy.id);

    return this.offerRepository.update(offer);
  }
}
