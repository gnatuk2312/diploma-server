import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { VACANCY_SERVICE } from './vacancy.constants';
import { VacancyServiceInterface } from './interface/vacancy-service.interface';
import { CreateVacancyDTO } from './dto/create-vacancy.dto';
import { VacancyInterface } from './interface/vacancy.interface';

@Controller('vacancies')
export class VacancyController {
  constructor(
    @Inject(VACANCY_SERVICE)
    private readonly vacancyService: VacancyServiceInterface,
  ) {}

  @Post()
  create(@Body() dto: CreateVacancyDTO): Promise<VacancyInterface> {
    return this.vacancyService.create(dto);
  }

  @Get(':id')
  getById(@Param('id') id: string): Promise<VacancyInterface> {
    return this.vacancyService.getById(id);
  }

  @Get()
  getAll(): Promise<VacancyInterface[]> {
    return this.vacancyService.getAll();
  }

  @Patch(':id/in-progress')
  markAsInProgress(@Param('id') id: string): Promise<VacancyInterface> {
    return this.vacancyService.markAsInProgress(id);
  }

  @Patch(':id/delivered')
  markAsDelivered(@Param('id') id: string): Promise<VacancyInterface> {
    return this.vacancyService.markAsDelivered(id);
  }
}
