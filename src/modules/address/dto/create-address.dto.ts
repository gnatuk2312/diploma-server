import { IsString } from 'class-validator';

export class CreateAddressDTO {
  @IsString()
  longitude: string;

  @IsString()
  latitude: string;

  @IsString()
  country: string;

  @IsString()
  city: string;

  @IsString()
  street: string;
}
