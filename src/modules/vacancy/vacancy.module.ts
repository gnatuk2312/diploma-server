import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Vacancy } from './entities/vacancy.entity';
import { UserModule } from '../user/user.module';
import { VACANCY_REPOSITORY, VACANCY_SERVICE } from './vacancy.constants';
import { VacancyRepository } from './vacancy.repository';
import { VacancyService } from './vacancy.service';
import { VacancyController } from './vacancy.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Vacancy]), UserModule],
  providers: [
    {
      provide: VACANCY_REPOSITORY,
      useClass: VacancyRepository,
    },
    {
      provide: VACANCY_SERVICE,
      useClass: VacancyService,
    },
  ],
  controllers: [VacancyController],
  exports: [VACANCY_SERVICE],
})
export class VacancyModule {}
