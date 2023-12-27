import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import { TokenPayloadDto } from './token-payload.dto';

export class SignInPayloadDto {
  readonly user: User;

  @ApiProperty({ type: () => TokenPayloadDto })
  readonly token: TokenPayloadDto;

  constructor(user: User, token: TokenPayloadDto) {
    this.user = user;
    this.token = token;
  }
}
