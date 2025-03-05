import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MessageRepositoryInterface } from './interface/message-repository.interface';
import { Message } from './entities/message.entity';
import { MessageInterface } from './interface/message.interface';

export class MessageRepository implements MessageRepositoryInterface {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  create(entity: MessageInterface): Promise<MessageInterface> {
    return this.messageRepository.save(entity);
  }

  getAllByChatId(chatId: string): Promise<MessageInterface[]> {
    return this.messageRepository.find({ where: { chat: { id: chatId } } });
  }
}
