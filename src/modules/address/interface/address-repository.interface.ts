import { AddressInterface } from './address.interface';

export interface AddressRepositoryInterface {
  create(entity: AddressInterface): Promise<AddressInterface>;
}
