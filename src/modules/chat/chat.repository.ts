import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ChatRepositoryInterface } from './interface/chat-repository.interface';
import { ChatInterface } from './interface/chat.interface';
import { Chat } from './entities/chat.entity';
import { ChatParticipantInterface } from './interface/chat-participant.interface';
import { ChatParticipant } from './entities/chat-participant.entity';

export class ChatRepository implements ChatRepositoryInterface {
  constructor(
    @InjectRepository(Chat)
    private readonly chatRepository: Repository<Chat>,
    @InjectRepository(ChatParticipant)
    private readonly chatParticipantRepository: Repository<ChatParticipant>,
  ) {}

  create(entity: ChatInterface): Promise<ChatInterface> {
    return this.chatRepository.save(entity);
  }

  update(entity: ChatInterface): Promise<ChatInterface> {
    return this.chatRepository.save(entity);
  }

  getById(id: string): Promise<ChatInterface> {
    return this.chatRepository.findOne({
      where: { id },
      relations: ['participants', 'participants.user'],
    });
  }

  getByVacancyId(vacancyId: string): Promise<ChatInterface> {
    return this.chatRepository.findOne({
      where: { vacancy: { id: vacancyId } },
      relations: ['participants', 'participants.user'],
    });
  }

  createParticipant(
    entity: ChatParticipantInterface,
  ): Promise<ChatParticipantInterface> {
    return this.chatParticipantRepository.save(entity);
  }
}
