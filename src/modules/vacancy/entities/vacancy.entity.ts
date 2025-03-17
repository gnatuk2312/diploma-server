import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { VacancyStatus } from '../vacancy.enums';
import { VacancyInterface } from '../interface/vacancy.interface';
import { User } from 'src/modules/user/entities/user.entity';
import { UserInterface } from 'src/modules/user/interface/user.interface';
import { AddressInterface } from 'src/modules/address/interface/address.interface';
import { Address } from 'src/modules/address/entities/address.entity';

@Entity('vacancies')
export class Vacancy implements VacancyInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: VacancyStatus })
  status: VacancyStatus;

  @Column()
  title: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ type: 'int' })
  unitPrice: number;

  @ManyToOne(() => User)
  @JoinColumn()
  creator: UserInterface;

  @OneToOne(() => Address)
  @JoinColumn()
  from: AddressInterface;

  @OneToOne(() => Address)
  @JoinColumn()
  to: AddressInterface;
}
