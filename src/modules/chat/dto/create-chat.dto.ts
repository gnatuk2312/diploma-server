import { IsArray, IsUUID } from 'class-validator';

export class CreateChatDTO {
  @IsUUID('4')
  vacancyId: string;

  @IsArray()
  @IsUUID('4', { each: true })
  participantIds: string[];
}
