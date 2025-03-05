import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MESSAGE_REPOSITORY, MESSAGE_SERVICE } from './message.constants';
import { Message } from './entities/message.entity';
import { MessageController } from './message.controller';
import { MessageRepository } from './message.repository';
import { MessageService } from './message.service';
import { ChatModule } from '../chat/chat.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Message]), ChatModule, UserModule],
  providers: [
    {
      provide: MESSAGE_REPOSITORY,
      useClass: MessageRepository,
    },
    {
      provide: MESSAGE_SERVICE,
      useClass: MessageService,
    },
  ],
  controllers: [MessageController],
  exports: [],
})
export class MessageModule {}
