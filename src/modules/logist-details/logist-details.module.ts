import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LogistDetails } from './entities/logist-details.entity';
import {
  LOGIST_DETAILS_REPOSITORY,
  LOGIST_DETAILS_SERVICE,
} from './logist-details.constants';
import { LogistDetailsRepository } from './logist-details.repository';
import { LogistDetailsService } from './logist-details.service';
import { LogistDetailsController } from './logist-details.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([LogistDetails]), UserModule],
  providers: [
    {
      provide: LOGIST_DETAILS_REPOSITORY,
      useClass: LogistDetailsRepository,
    },
    {
      provide: LOGIST_DETAILS_SERVICE,
      useClass: LogistDetailsService,
    },
  ],
  controllers: [LogistDetailsController],
  exports: [LOGIST_DETAILS_SERVICE],
})
export class LogistDetailsModule {}
