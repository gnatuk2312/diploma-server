import { Type } from 'class-transformer';
import {
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

import { CreateAddressDTO } from 'src/modules/address/dto/create-address.dto';

export class UpdateVacancyDTO {
  @IsUUID('4')
  id: string;

  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsInt()
  unitPrice: number;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => CreateAddressDTO)
  from: CreateAddressDTO;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => CreateAddressDTO)
  to: CreateAddressDTO;
}
