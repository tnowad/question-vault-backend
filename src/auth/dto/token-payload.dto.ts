import { ApiProperty } from '@nestjs/swagger';

export class TokenPayloadDto {
  @ApiProperty()
  readonly accessToken: string;

  @ApiProperty()
  readonly refreshToken?: string;

  constructor(data: { accessToken: string; refreshToken?: string }) {
    this.accessToken = data.accessToken;

    if (data.refreshToken) {
      this.refreshToken = data.refreshToken;
    }
  }
}
