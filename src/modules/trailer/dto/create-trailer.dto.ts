import { IsInt, IsUUID } from 'class-validator';

export class CreateTrailerDTO {
  @IsUUID('4')
  vehicleId: string;

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
