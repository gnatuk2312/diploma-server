import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { UserInterface } from 'src/modules/user/interface/user.interface';
import { VehicleInterface } from '../interface/vehicle.interface';
import { User } from 'src/modules/user/entities/user.entity';
import { File } from 'src/modules/file/entities/file.entity';
import { FileInterface } from 'src/modules/file/interface/file.interface';

@Entity('vehicles')
export class Vehicle implements VehicleInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  brand: string;

  @Column({ nullable: true })
  model: string | null;

  @Column({ type: 'int' })
  kilometrage: number;

  @ManyToOne(() => User)
  driver: UserInterface;

  @OneToOne(() => File)
  @JoinColumn()
  registration: FileInterface;
}
