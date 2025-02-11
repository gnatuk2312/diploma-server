import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Trailer } from './entities/trailer.entity';
import { VehicleModule } from '../vehicle/vehicle.module';
import { TRAILER_REPOSITORY, TRAILER_SERVICE } from './trailer.constants';
import { TrailerRepository } from './trailer.repository';
import { TrailerService } from './trailer.service';
import { TrailerController } from './trailer.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Trailer]), VehicleModule],
  providers: [
    {
      provide: TRAILER_REPOSITORY,
      useClass: TrailerRepository,
    },
    {
      provide: TRAILER_SERVICE,
      useClass: TrailerService,
    },
  ],
  controllers: [TrailerController],
  exports: [],
})
export class TrailerModule {}
