import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DriverDetails } from './entities/driver-details.entity';
import { UserModule } from '../user/user.module';
import {
  DRIVER_DETAILS_REPOSITORY,
  DRIVER_DETAILS_SERVICE,
} from './driver-details.constants';
import { DriverDetailsRepository } from './driver-details.repository';
import { DriverDetailsService } from './driver-details.service';
import { DriverDetailsController } from './driver-details.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DriverDetails]), UserModule],
  providers: [
    {
      provide: DRIVER_DETAILS_REPOSITORY,
      useClass: DriverDetailsRepository,
    },
    {
      provide: DRIVER_DETAILS_SERVICE,
      useClass: DriverDetailsService,
    },
  ],
  controllers: [DriverDetailsController],
  exports: [DRIVER_DETAILS_SERVICE],
})
export class DriverDetailsModule {}
