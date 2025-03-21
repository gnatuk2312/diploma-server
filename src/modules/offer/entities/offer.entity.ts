import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { UserInterface } from 'src/modules/user/interface/user.interface';
import { VacancyInterface } from 'src/modules/vacancy/interface/vacancy.interface';
import { OfferInterface } from '../interface/offer.interface';
import { Vacancy } from 'src/modules/vacancy/entities/vacancy.entity';
import { User } from 'src/modules/user/entities/user.entity';

@Entity('offers')
export class Offer implements OfferInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Column({ nullable: true })
  comment: string | null;

  @Column({ type: 'timestamp', nullable: true })
  acceptedAt: Date | null;

  @ManyToOne(() => Vacancy)
  vacancy: VacancyInterface;

  @ManyToOne(() => User)
  creator: UserInterface;
}
