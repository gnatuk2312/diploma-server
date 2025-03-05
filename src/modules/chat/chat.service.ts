import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';

import { CreateChatDTO } from './dto/create-chat.dto';
import { ChatServiceInterface } from './interface/chat-service.interface';
import { ChatInterface } from './interface/chat.interface';
import { CHAT_REPOSITORY } from './chat.constants';
import { ChatRepositoryInterface } from './interface/chat-repository.interface';
import { VACANCY_SERVICE } from '../vacancy/vacancy.constants';
import { VacancyServiceInterface } from '../vacancy/interface/vacancy-service.interface';
import { Chat } from './entities/chat.entity';
import { USER_SERVICE } from '../user/user.constants';
import { UserServiceInterface } from '../user/interface/user-service.interface';
import { ChatParticipant } from './entities/chat-participant.entity';
import { ChatParticipantInterface } from './interface/chat-participant.interface';

export class ChatService implements ChatServiceInterface {
  constructor(
    @Inject(CHAT_REPOSITORY)
    private readonly chatRepository: ChatRepositoryInterface,
    @Inject(VACANCY_SERVICE)
    private readonly vacancyService: VacancyServiceInterface,
    @Inject(USER_SERVICE)
    private readonly userService: UserServiceInterface,
  ) {}

  async create(dto: CreateChatDTO): Promise<ChatInterface> {
    const { vacancyId, participantIds } = dto;

    const vacancy = await this.vacancyService.getById(vacancyId);
    if (!vacancy) throw new BadRequestException('Vacancy does not exist');

    const chat = new Chat();

    chat.vacancy = vacancy;

    const savedChat = await this.chatRepository.create(chat);
    await this.createParticipants(participantIds, savedChat);

    return this.chatRepository.getById(savedChat.id);
  }

  private createParticipants(
    participantIds: string[],
    chat: ChatInterface,
  ): Promise<ChatParticipantInterface[]> {
    return Promise.all(
      participantIds.map(async (participantId) => {
        const user = await this.userService.findById(participantId);
        if (!user) throw new NotFoundException();

        const chatParticipant = new ChatParticipant();

        chatParticipant.chat = chat;
        chatParticipant.user = user;

        return await this.chatRepository.createParticipant(chatParticipant);
      }),
    );
  }

  getById(id: string): Promise<ChatInterface> {
    return this.chatRepository.getById(id);
  }

  getByVacancyId(vacancyId: string): Promise<ChatInterface> {
    return this.chatRepository.getByVacancyId(vacancyId);
  }
}
