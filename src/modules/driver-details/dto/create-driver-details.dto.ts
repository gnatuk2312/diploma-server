import { IsEmail, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateDriverDetailsDTO {
  @IsUUID('4')
  userId: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  phoneNumber: string;

  //   driverLicense: File
  //   vehicleIds: string[]
}
