import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OFFER_REPOSITORY, OFFER_SERVICE } from './offer.constants';
import { Offer } from './entities/offer.entity';
import { OfferRepository } from './offer.repository';
import { OfferService } from './offer.service';
import { OfferController } from './offer.controller';
import { VacancyModule } from '../vacancy/vacancy.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Offer]), VacancyModule, UserModule],
  providers: [
    {
      provide: OFFER_REPOSITORY,
      useClass: OfferRepository,
    },
    {
      provide: OFFER_SERVICE,
      useClass: OfferService,
    },
  ],
  controllers: [OfferController],
  exports: [],
})
export class OfferModule {}
