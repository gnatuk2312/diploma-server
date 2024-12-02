import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { UserInterface } from 'src/modules/user/interface/user.interface';
import { VehicleInterface } from '../interface/vehicle.interface';
import { User } from 'src/modules/user/entities/user.entity';

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
}
