import { Body, Controller, Inject, Post } from '@nestjs/common';

import { ADDRESS_SERVICE } from './address.constants';
import { AddressServiceInterface } from './interface/address-service.interface';
import { CreateAddressDTO } from './dto/create-address.dto';
import { AddressInterface } from './interface/address.interface';

@Controller('addresses')
export class AddressController {
  constructor(
    @Inject(ADDRESS_SERVICE)
    private readonly addressService: AddressServiceInterface,
  ) {}

  @Post()
  create(@Body() dto: CreateAddressDTO): Promise<AddressInterface> {
    return this.addressService.create(dto);
  }
}
