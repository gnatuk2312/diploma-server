import { ChatInterface } from './chat.interface';
import { CreateChatDTO } from '../dto/create-chat.dto';

export interface ChatServiceInterface {
  create(dto: CreateChatDTO): Promise<ChatInterface>;
  getById(id: string): Promise<ChatInterface>;
  getByVacancyId(vacancyId: string): Promise<ChatInterface>;
}
