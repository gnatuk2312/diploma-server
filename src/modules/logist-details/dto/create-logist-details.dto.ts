import { IsEmail, IsString, IsUUID } from 'class-validator';

export class CreateLogistDetailsDTO {
  @IsUUID('4')
  userId: string;

  @IsString()
  description: string;

  @IsEmail()
  email: string;

  @IsString()
  phoneNumber: string;
}
