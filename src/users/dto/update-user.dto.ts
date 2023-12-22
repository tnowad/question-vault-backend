import {
  IsOptional,
  MaxLength,
  IsDate,
  IsNotEmpty,
  IsString,
  Matches,
} from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  fullName?: string;

  @IsOptional()
  @MaxLength(32)
  phone?: string;

  @IsOptional()
  @MaxLength(32)
  username?: string;

  @IsOptional()
  @IsDate()
  birthdate?: Date;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  oldPassword?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message:
      'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one digit',
  })
  newPassword?: string;
}
