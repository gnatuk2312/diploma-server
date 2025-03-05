import { MessageInterface } from './message.interface';

export interface MessageRepositoryInterface {
  create(entity: MessageInterface): Promise<MessageInterface>;
  getAllByChatId(chatId: string): Promise<MessageInterface[]>;
}
