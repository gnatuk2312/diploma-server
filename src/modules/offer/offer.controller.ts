import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { OFFER_SERVICE } from './offer.constants';
import { OfferServiceInterface } from './interface/offer-service.interface';
import { CreateOfferDTO } from './dto/create-offer.dto';
import { OfferInterface } from './interface/offer.interface';

@Controller('offers')
export class OfferController {
  constructor(
    @Inject(OFFER_SERVICE) private readonly offerService: OfferServiceInterface,
  ) {}

  @Post()
  create(@Body() dto: CreateOfferDTO): Promise<OfferInterface> {
    return this.offerService.create(dto);
  }

  @Patch('accept/:id')
  accept(@Param('id') id: string): Promise<OfferInterface> {
    return this.offerService.accept(id);
  }

  @Get(':id')
  getById(@Param('id') id: string): Promise<OfferInterface> {
    return this.offerService.getById(id);
  }

  @Get('vacancies/:vacancyId')
  getAllByVacancyId(
    @Param('vacancyId') vacancyId: string,
  ): Promise<OfferInterface[]> {
    return this.offerService.getAllByVacancyId(vacancyId);
  }
}
