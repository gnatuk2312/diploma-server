import {
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ChatInterface } from '../interface/chat.interface';
import { Vacancy } from 'src/modules/vacancy/entities/vacancy.entity';
import { VacancyInterface } from 'src/modules/vacancy/interface/vacancy.interface';
import { ChatParticipant } from './chat-participant.entity';
import { ChatParticipantInterface } from '../interface/chat-participant.interface';

@Entity('chats')
export class Chat implements ChatInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Vacancy)
  @JoinColumn()
  vacancy: VacancyInterface;

  @OneToMany(() => ChatParticipant, (chatParticipant) => chatParticipant.chat, {
    cascade: true,
  })
  participants: ChatParticipantInterface[];
}
