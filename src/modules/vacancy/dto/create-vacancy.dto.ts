import { IsInt, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateVacancyDTO {
  @IsUUID('4')
  creatorId: string;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsInt()
  unitPrice: number;
}
