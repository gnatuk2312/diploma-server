import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { VacancyRepositoryInterface } from './interface/vacancy-repository.interface';
import { VacancyInterface } from './interface/vacancy.interface';
import { Vacancy } from './entities/vacancy.entity';

export class VacancyRepository implements VacancyRepositoryInterface {
  constructor(
    @InjectRepository(Vacancy)
    private readonly vacancyRepository: Repository<Vacancy>,
  ) {}

  create(entity: VacancyInterface): Promise<VacancyInterface> {
    return this.vacancyRepository.save(entity);
  }

  update(entity: VacancyInterface): Promise<VacancyInterface> {
    return this.vacancyRepository.save(entity);
  }

  getById(id: string): Promise<VacancyInterface> {
    return this.vacancyRepository.findOne({
      where: { id },
      relations: ['from', 'to'],
    });
  }

  getAll(): Promise<VacancyInterface[]> {
    return this.vacancyRepository.find({ relations: ['from', 'to'] });
  }
}
