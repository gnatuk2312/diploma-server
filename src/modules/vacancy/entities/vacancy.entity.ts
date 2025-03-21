import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { VacancyStatus } from '../vacancy.enums';
import { VacancyInterface } from '../interface/vacancy.interface';
import { User } from 'src/modules/user/entities/user.entity';
import { UserInterface } from 'src/modules/user/interface/user.interface';
import { AddressInterface } from 'src/modules/address/interface/address.interface';
import { Address } from 'src/modules/address/entities/address.entity';
import { OfferInterface } from 'src/modules/offer/interface/offer.interface';
import { Offer } from 'src/modules/offer/entities/offer.entity';

@Entity('vacancies')
export class Vacancy implements VacancyInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Column({ type: 'enum', enum: VacancyStatus })
  status: VacancyStatus;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string | null;

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

  @OneToMany(() => Offer, (offer) => offer.vacancy)
  offers?: OfferInterface[];
}
