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

  @IsObject()
  @ValidateNested()
  @Type(() => CreateAddressDTO)
  from: CreateAddressDTO;

  @IsObject()
  @ValidateNested()
  @Type(() => CreateAddressDTO)
  to: CreateAddressDTO;
}
