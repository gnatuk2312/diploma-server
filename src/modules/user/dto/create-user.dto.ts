import { IsEnum, IsString } from 'class-validator';

import { UserRole } from '../user.enums';

export class CreateUserDTO {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsEnum(UserRole)
  role: UserRole;
}
