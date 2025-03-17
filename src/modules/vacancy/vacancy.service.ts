import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';

import { CreateVacancyDTO } from './dto/create-vacancy.dto';
import { VacancyServiceInterface } from './interface/vacancy-service.interface';
import { VacancyInterface } from './interface/vacancy.interface';
import { VACANCY_REPOSITORY } from './vacancy.constants';
import { VacancyRepositoryInterface } from './interface/vacancy-repository.interface';
import { USER_SERVICE } from '../user/user.constants';
import { UserServiceInterface } from '../user/interface/user-service.interface';
import { UserRole } from '../user/user.enums';
import { Vacancy } from './entities/vacancy.entity';
import { VacancyStatus } from './vacancy.enums';
import { ADDRESS_SERVICE } from '../address/address.constants';
import { AddressServiceInterface } from '../address/interface/address-service.interface';

export class VacancyService implements VacancyServiceInterface {
  constructor(
    @Inject(VACANCY_REPOSITORY)
    private readonly vacancyRepository: VacancyRepositoryInterface,
    @Inject(USER_SERVICE)
    private readonly userService: UserServiceInterface,
    @Inject(ADDRESS_SERVICE)
    private readonly addressService: AddressServiceInterface,
  ) {}

  async create(dto: CreateVacancyDTO): Promise<VacancyInterface> {
    const { creatorId, title, description, unitPrice, from, to } = dto;

    const creator = await this.userService.findById(creatorId);

    if (!creator) {
      throw new NotFoundException('Creator not found');
    }

    if (creator.role !== UserRole.LOGIST) {
      throw new BadRequestException(
        'Vacancy can be created only by LOGIST role',
      );
    }

    const vacancy = new Vacancy();

    vacancy.creator = creator;
    vacancy.status = VacancyStatus.NEW;
    vacancy.title = title;
    vacancy.description = description;
    vacancy.unitPrice = unitPrice;
    vacancy.from = await this.addressService.create(from);
    vacancy.to = await this.addressService.create(to);

    return this.vacancyRepository.create(vacancy);
  }

  getById(id: string): Promise<VacancyInterface> {
    return this.vacancyRepository.getById(id);
  }

  getAll(): Promise<VacancyInterface[]> {
    return this.vacancyRepository.getAll();
  }
}
