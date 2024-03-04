import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ConfigKey } from '../enums/config.enum';
export class CreateConfigDto {
  @IsNotEmpty()
  @IsEnum(ConfigKey)
  key: ConfigKey;

  @IsNotEmpty()
  @IsString()
  value: string;
}
