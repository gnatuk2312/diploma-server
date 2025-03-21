import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Vehicle } from './entities/vehicle.entity';
import { UserModule } from '../user/user.module';
import { VEHICLE_REPOSITORY, VEHICLE_SERVICE } from './vehicle.constants';
import { VehicleRepository } from './vehicle.repository';
import { VehicleService } from './vehicle.service';
import { VehicleController } from './vehicle.controller';
import { FileModule } from '../file/file.module';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle]), UserModule, FileModule],
  providers: [
    {
      provide: VEHICLE_REPOSITORY,
      useClass: VehicleRepository,
    },
    {
      provide: VEHICLE_SERVICE,
      useClass: VehicleService,
    },
  ],
  controllers: [VehicleController],
  exports: [VEHICLE_SERVICE],
})
export class VehicleModule {}
