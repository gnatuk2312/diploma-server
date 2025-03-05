import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateOfferDTO {
  @IsUUID('4')
  vacancyId: string;

  @IsUUID('4')
  creatorId: string;

  @IsOptional()
  @IsString()
  comment: string | null;
}
