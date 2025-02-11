import { IsInt, IsOptional, IsUUID } from 'class-validator';

export class UpdateTrailerDTO {
  @IsUUID('4')
  id: string;

  @IsOptional()
  @IsInt()
  height: number;

  @IsOptional()
  @IsInt()
  width: number;

  @IsOptional()
  @IsInt()
  length: number;

  @IsOptional()
  @IsInt()
  weight: number;

  @IsOptional()
  @IsInt()
  loadCapacity: number;
}
