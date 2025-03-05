import { IsString, IsUUID } from 'class-validator';

export class CreateMessageDTO {
  @IsString()
  content: string;

  @IsUUID('4')
  chatId: string;

  @IsUUID('4')
  creatorId: string; // user.id (not participant.id)
}
