import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { VehicleInterface } from 'src/modules/vehicle/interface/vehicle.interface';
import { TrailerInterface } from '../interface/trailer.interface';
import { Vehicle } from 'src/modules/vehicle/entities/vehicle.entity';

@Entity('trailers')
export class Trailer implements TrailerInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int' })
  height: number;

  @Column({ type: 'int' })
  width: number;

  @Column({ type: 'int' })
  length: number;

  @Column({ type: 'int' })
  weight: number;

  @Column({ type: 'int' })
  loadCapacity: number;

  @OneToOne(() => Vehicle)
  @JoinColumn()
  vehicle: VehicleInterface;
}
