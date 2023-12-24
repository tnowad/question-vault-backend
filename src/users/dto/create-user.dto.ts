import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  MaxLength,
  IsDate,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ required: false, example: 'John Doe' })
  @IsOptional()
  fullName?: string;

  @ApiProperty({
    maxLength: 32,
    format: 'phone',
    required: false,
    example: '1234567890',
  })
  @IsOptional()
  @MaxLength(32)
  phone?: string;

  @ApiProperty({ maxLength: 32, required: false, example: 'john_doe' })
  @IsOptional()
  @MaxLength(32)
  username?: string;

  @ApiProperty({
    maxLength: 128,
    format: 'email',
    required: true,
    example: 'john.doe@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    maxLength: 128,
    pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$',
    example: 'Password123',
  })
  @MaxLength(128)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message:
      'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one digit',
  })
  password: string;

  @ApiProperty({ type: Date, required: false, example: '2022-01-01' })
  @IsOptional()
  @IsDate()
  birthdate?: Date;
}
