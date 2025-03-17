import { Inject } from '@nestjs/common';

import { CreateAddressDTO } from './dto/create-address.dto';
import { AddressServiceInterface } from './interface/address-service.interface';
import { AddressInterface } from './interface/address.interface';
import { ADDRESS_REPOSITORY } from './address.constants';
import { AddressRepositoryInterface } from './interface/address-repository.interface';
import { Address } from './entities/address.entity';

export class AddressService implements AddressServiceInterface {
  constructor(
    @Inject(ADDRESS_REPOSITORY)
    private readonly addressRepository: AddressRepositoryInterface,
  ) {}

  create(dto: CreateAddressDTO): Promise<AddressInterface> {
    const { longitude, latitude, country, city, street } = dto;

    const address = new Address();

    address.longitude = longitude;
    address.latitude = latitude;
    address.country = country;
    address.city = city;
    address.street = street;

    return this.addressRepository.create(address);
  }
}
