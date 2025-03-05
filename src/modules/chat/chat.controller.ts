import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { CHAT_SERVICE } from './chat.constants';
import { ChatServiceInterface } from './interface/chat-service.interface';
import { CreateChatDTO } from './dto/create-chat.dto';
import { ChatInterface } from './interface/chat.interface';

@Controller('chats')
export class ChatController {
  constructor(
    @Inject(CHAT_SERVICE)
    private readonly chatService: ChatServiceInterface,
  ) {}

  @Post()
  create(@Body() dto: CreateChatDTO): Promise<ChatInterface> {
    return this.chatService.create(dto);
  }

  @Get(':id')
  getById(@Param('id') id: string): Promise<ChatInterface> {
    return this.chatService.getById(id);
  }

  @Get('vacancies/:vacancyId')
  getByVacancyId(
    @Param('vacancyId') vacancyId: string,
  ): Promise<ChatInterface> {
    return this.chatService.getByVacancyId(vacancyId);
  }
}
