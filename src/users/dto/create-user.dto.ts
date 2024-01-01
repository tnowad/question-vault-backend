import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, MaxLength, IsDate } from 'class-validator';

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

  @ApiProperty({ maxLength: 32, required: true, example: 'john_doe' })
  @IsOptional()
  @MaxLength(32)
  username: string;

  @ApiProperty({ type: Date, required: false, example: '2022-01-01' })
  @IsOptional()
  @IsDate()
  birthdate?: Date;
}
