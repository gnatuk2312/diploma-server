import { ChatParticipantInterface } from './chat-participant.interface';
import { ChatInterface } from './chat.interface';

export interface ChatRepositoryInterface {
  create(entity: ChatInterface): Promise<ChatInterface>;
  update(entity: ChatInterface): Promise<ChatInterface>;
  getById(id: string): Promise<ChatInterface>;
  getByVacancyId(vacancyId: string): Promise<ChatInterface>;
  createParticipant(
    entity: ChatParticipantInterface,
  ): Promise<ChatParticipantInterface>;
}
