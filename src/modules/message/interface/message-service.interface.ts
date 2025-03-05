import { MessageInterface } from './message.interface';
import { CreateMessageDTO } from '../dto/create-message.dto';

export interface MessageServiceInterface {
  create(dto: CreateMessageDTO): Promise<MessageInterface>;
  getAllByChatId(chatId: string): Promise<MessageInterface[]>;
}
