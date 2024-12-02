import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateVehicleDTO {
  @IsUUID('4')
  driverId: string;

  @IsString()
  brand: string;

  @IsOptional()
  @IsString()
  model: string;

  @IsNumber()
  kilometrage: number;
}
