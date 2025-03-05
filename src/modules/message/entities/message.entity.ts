import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ChatInterface } from 'src/modules/chat/interface/chat.interface';
import { UserInterface } from 'src/modules/user/interface/user.interface';
import { MessageInterface } from '../interface/message.interface';
import { Chat } from 'src/modules/chat/entities/chat.entity';
import { User } from 'src/modules/user/entities/user.entity';

@Entity('messages')
export class Message implements MessageInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Column()
  content: string;

  @ManyToOne(() => Chat)
  chat: ChatInterface;

  @ManyToOne(() => User)
  creator: UserInterface;
}
