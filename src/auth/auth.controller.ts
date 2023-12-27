import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { ApiTags } from '@nestjs/swagger';
import { SignUpDto } from './dto/sign-up.dto';
import { TokenPayloadDto } from './dto/token-payload.dto';
import { SignInPayloadDto } from './dto/sign-in-payload.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDto) {
    const user = await this.authService.validateUser(signInDto);

    const token = new TokenPayloadDto({
      accessToken: '',
      refreshToken: '',
    });

    return new SignInPayloadDto(user, token);
  }

  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto) {}
}
