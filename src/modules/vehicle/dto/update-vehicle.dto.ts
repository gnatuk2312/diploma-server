import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateVehicleDTO {
  @IsUUID('4')
  id: string;

  @IsOptional()
  @IsUUID('4')
  registrationFileId: string;

  @IsOptional()
  @IsString()
  brand: string;

  @IsOptional()
  @IsString()
  model: string;

  @IsOptional()
  @IsNumber()
  kilometrage: number;
}
