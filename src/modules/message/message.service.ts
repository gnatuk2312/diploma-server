import { Inject, NotFoundException } from '@nestjs/common';

import { MessageServiceInterface } from './interface/message-service.interface';
import { MESSAGE_REPOSITORY } from './message.constants';
import { MessageRepositoryInterface } from './interface/message-repository.interface';
import { CreateMessageDTO } from './dto/create-message.dto';
import { MessageInterface } from './interface/message.interface';
import { CHAT_SERVICE } from '../chat/chat.constants';
import { ChatServiceInterface } from '../chat/interface/chat-service.interface';
import { USER_SERVICE } from '../user/user.constants';
import { UserServiceInterface } from '../user/interface/user-service.interface';
import { Message } from './entities/message.entity';

export class MessageService implements MessageServiceInterface {
  constructor(
    @Inject(MESSAGE_REPOSITORY)
    private readonly messageRepository: MessageRepositoryInterface,
    @Inject(CHAT_SERVICE)
    private readonly chatService: ChatServiceInterface,
    @Inject(USER_SERVICE)
    private readonly userService: UserServiceInterface,
  ) {}

  async create(dto: CreateMessageDTO): Promise<MessageInterface> {
    const { content, chatId, creatorId } = dto;

    const chat = await this.chatService.getById(chatId);
    if (!chat) throw new NotFoundException();

    const creator = await this.userService.findById(creatorId);
    if (!creator) throw new NotFoundException();

    const message = new Message();

    message.content = content;
    message.chat = chat;
    message.creator = creator;

    return this.messageRepository.create(message);
  }

  getAllByChatId(chatId: string): Promise<MessageInterface[]> {
    return this.messageRepository.getAllByChatId(chatId);
  }
}
