import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';

import { VACANCY_SERVICE } from './vacancy.constants';
import { VacancyServiceInterface } from './interface/vacancy-service.interface';
import { CreateVacancyDTO } from './dto/create-vacancy.dto';
import { VacancyInterface } from './interface/vacancy.interface';
import { UpdateVacancyDTO } from './dto/update-vacancy.dto';

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

  @Put()
  update(@Body() dto: UpdateVacancyDTO): Promise<VacancyInterface> {
    return this.vacancyService.update(dto);
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

  @Get('status/new')
  getStatusNew(): Promise<VacancyInterface[]> {
    return this.vacancyService.getStatusNew();
  }

  // TODO: get userId from the accessToken
  @Get('applied/:userId')
  getApplied(@Param('userId') userId: string): Promise<VacancyInterface[]> {
    return this.vacancyService.getApplied(userId);
  }

  // TODO: get userId from the accessToken
  @Get('created/:userId')
  getCreated(@Param('userId') userId: string): Promise<VacancyInterface[]> {
    return this.vacancyService.getCreated(userId);
  }

  // TODO: get userId from the accessToken
  @Get('status/in-progress/:userId')
  getStatusInProgress(
    @Param('userId') userId: string,
  ): Promise<VacancyInterface[]> {
    return this.vacancyService.getStatusInProgress(userId);
  }

  // TODO: get userId from the accessToken
  @Get('status/delivered/:userId')
  getStatusDelivered(
    @Param('userId') userId: string,
  ): Promise<VacancyInterface[]> {
    return this.vacancyService.getStatusDelivered(userId);
  }
}
