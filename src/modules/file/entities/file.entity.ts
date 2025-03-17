import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { FileInterface } from '../interface/file.interface';

@Entity('files')
export class File implements FileInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Column()
  publicPath: string;

  @Column()
  fileName: string;

  @Column()
  mimeType: string;

  @Column()
  extension: string;
}
