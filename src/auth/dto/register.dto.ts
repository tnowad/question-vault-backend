import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Matches, MaxLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    maxLength: 128,
    format: 'email',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({ maxLength: 128, example: 'John Doe' })
  @IsNotEmpty()
  @MaxLength(128)
  fullName: string;

  @ApiProperty({ maxLength: 32, example: 'john_doe' })
  @IsNotEmpty()
  @MaxLength(32)
  username: string;

  @ApiProperty({ maxLength: 32, format: 'phone', example: '1234567890' })
  @IsNotEmpty()
  @MaxLength(32)
  phone: string;

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
}
