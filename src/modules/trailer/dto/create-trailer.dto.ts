import { IsInt, IsOptional, IsUUID } from 'class-validator';

export class CreateTrailerDTO {
  @IsUUID('4')
  vehicleId: string;

  @IsOptional()
  @IsUUID('4')
  registrationFileId: string;

  @IsInt()
  height: number;

  @IsInt()
  width: number;

  @IsInt()
  length: number;

  @IsInt()
  weight: number;

  @IsInt()
  loadCapacity: number;
}
