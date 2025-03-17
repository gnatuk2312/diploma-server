import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AddressRepositoryInterface } from './interface/address-repository.interface';
import { AddressInterface } from './interface/address.interface';
import { Address } from './entities/address.entity';

export class AddressRepository implements AddressRepositoryInterface {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}

  create(entity: AddressInterface): Promise<AddressInterface> {
    return this.addressRepository.save(entity);
  }
}
