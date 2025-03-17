import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { AddressInterface } from '../interface/address.interface';

@Entity('addresses')
export class Address implements AddressInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  longitude: string;

  @Column()
  latitude: string;

  @Column()
  country: string;

  @Column()
  city: string;

  @Column()
  street: string;
}
