import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { UserInterface } from 'src/modules/user/interface/user.interface';
import { DriverDetailsInterface } from '../interface/driver-details.interface';
import { User } from 'src/modules/user/entities/user.entity';
import { FileInterface } from 'src/modules/file/interface/file.interface';
import { File } from 'src/modules/file/entities/file.entity';

@Entity('driver_details')
export class DriverDetails implements DriverDetailsInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: UserInterface;

  @OneToOne(() => File)
  @JoinColumn()
  driverLicense: FileInterface;
}
