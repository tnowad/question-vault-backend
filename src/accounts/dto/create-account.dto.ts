import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateAccountDto {
  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsString()
  provider: string;

  @IsNotEmpty()
  @IsString()
  providerAccountId: string;

  @IsNotEmpty()
  userId: number;

  @IsOptional()
  @IsString()
  refreshToken?: string;

  @IsOptional()
  @IsString()
  accessToken?: string;

  @IsOptional()
  expiresAt?: number;

  @IsOptional()
  @IsString()
  idToken?: string;

  @IsOptional()
  @IsString()
  scope?: string;

  @IsOptional()
  @IsString()
  sessionState?: string;

  @IsOptional()
  @IsString()
  tokenType?: string;

  @IsOptional()
  @IsString()
  @Exclude({ toPlainOnly: true })
  password?: string;

  constructor(partial: Partial<CreateAccountDto>) {
    Object.assign(this, partial);
  }
}
