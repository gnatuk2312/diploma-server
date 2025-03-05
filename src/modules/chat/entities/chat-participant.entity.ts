import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { ChatParticipantInterface } from '../interface/chat-participant.interface';
import { ChatInterface } from '../interface/chat.interface';
import { UserInterface } from 'src/modules/user/interface/user.interface';
import { Chat } from './chat.entity';
import { User } from 'src/modules/user/entities/user.entity';

@Entity('chat_participants')
export class ChatParticipant implements ChatParticipantInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Chat)
  chat: ChatInterface;

  @ManyToOne(() => User)
  user: UserInterface;
}
