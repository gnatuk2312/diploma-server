import { IsEmail, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateLogistDetailsDTO {
  @IsUUID('4')
  id: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;
}
