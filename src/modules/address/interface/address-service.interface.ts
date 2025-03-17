import { AddressInterface } from './address.interface';
import { CreateAddressDTO } from '../dto/create-address.dto';

export interface AddressServiceInterface {
  create(dto: CreateAddressDTO): Promise<AddressInterface>;
}
