import { Body, Controller, Post } from '@nestjs/common';
import { AuthEmailSignInDto } from './dto/auth-email-sign-in.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthEmailSignUpDto } from './dto/auth-email-sign-up.dto';
import { AuthEmailService } from './auth-email.service';

@ApiTags('auth/email')
@Controller('auth/email')
export class AuthEmailController {
  constructor(private readonly authEmailService: AuthEmailService) {}

  @Post('sign-in')
  async signIn(@Body() authEmailSignInDto: AuthEmailSignInDto) {
    const user = await this.authEmailService.signIn(authEmailSignInDto);

    // TODO: Implement JWT
    const token = {
      accessToken: '',
      refreshToken: '',
    };
    return { user, token };
  }

}
