import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CHAT_REPOSITORY, CHAT_SERVICE } from './chat.constants';
import { Chat } from './entities/chat.entity';
import { ChatParticipant } from './entities/chat-participant.entity';
import { ChatController } from './chat.controller';
import { ChatRepository } from './chat.repository';
import { ChatService } from './chat.service';
import { VacancyModule } from '../vacancy/vacancy.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Chat, ChatParticipant]),
    VacancyModule,
    UserModule,
  ],
  providers: [
    {
      provide: CHAT_REPOSITORY,
      useClass: ChatRepository,
    },
    {
      provide: CHAT_SERVICE,
      useClass: ChatService,
    },
  ],
  controllers: [ChatController],
  exports: [],
})
export class ChatModule {}
