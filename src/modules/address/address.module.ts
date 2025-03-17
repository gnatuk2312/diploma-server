import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AddressController } from './address.controller';
import { ADDRESS_REPOSITORY, ADDRESS_SERVICE } from './address.constants';
import { AddressRepository } from './address.repository';
import { AddressService } from './address.service';
import { Address } from './entities/address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Address])],
  providers: [
    {
      provide: ADDRESS_REPOSITORY,
      useClass: AddressRepository,
    },
    {
      provide: ADDRESS_SERVICE,
      useClass: AddressService,
    },
  ],
  controllers: [AddressController],
  exports: [ADDRESS_SERVICE],
})
export class AddressModule {}
