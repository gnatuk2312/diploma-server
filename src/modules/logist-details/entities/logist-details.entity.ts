import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { LogistDetailsInterface } from '../interface/logist-details.interface';
import { UserInterface } from 'src/modules/user/interface/user.interface';
import { User } from 'src/modules/user/entities/user.entity';

@Entity('logist_details')
export class LogistDetails implements LogistDetailsInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: UserInterface;
}
