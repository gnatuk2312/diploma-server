import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';

import { MESSAGE_SERVICE } from './message.constants';
import { MessageServiceInterface } from './interface/message-service.interface';
import { CreateMessageDTO } from './dto/create-message.dto';
import { MessageInterface } from './interface/message.interface';

@Controller('messages')
export class MessageController {
  constructor(
    @Inject(MESSAGE_SERVICE)
    private readonly messageService: MessageServiceInterface,
  ) {}

  @Post()
  create(@Body() dto: CreateMessageDTO): Promise<MessageInterface> {
    return this.messageService.create(dto);
  }

  @Get('chat/:chatId')
  getAllByChatId(@Param('chatId') chatId: string): Promise<MessageInterface[]> {
    return this.messageService.getAllByChatId(chatId);
  }
}
