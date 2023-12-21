import {
  IsEmail,
  IsOptional,
  MaxLength,
  IsDate,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  fullName?: string;

  @IsOptional()
  @MaxLength(32)
  phone?: string;

  @IsOptional()
  @MaxLength(32)
  username?: string;

  @IsEmail()
  email: string;

  @MaxLength(128)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message:
      'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one digit',
  })
  password: string;

  @IsOptional()
  @IsDate()
  birthdate?: Date;
}
