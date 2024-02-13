import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { AuthEmailSignInDto } from './dto/auth-email-sign-in.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthEmailSignUpDto } from './dto/auth-email-sign-up.dto';
import { AuthEmailService } from './auth-email.service';
import { AuthService } from 'src/auth/auth.service';

@ApiTags('auth/email')
@Controller('auth/email')
export class AuthEmailController {
  constructor(
    private readonly authEmailService: AuthEmailService,
    private readonly authService: AuthService,
  ) {}

  @Post('sign-in')
  async signIn(@Body() authEmailSignInDto: AuthEmailSignInDto) {
    const user = await this.authEmailService.signIn(authEmailSignInDto);
    const token = await this.authService.createTokens(user);

    return {
      statusCode: HttpStatus.OK,
      data: {
        user,
        token,
      },
    };
  }

  @Post('sign-up')
  async signUp(@Body() authEmailSignUpDto: AuthEmailSignUpDto) {
    const user = await this.authEmailService.signUp(authEmailSignUpDto);

    // TODO: Send verification email
    const message =
      'Registration successful. Please check your email to verify your account.';

    // TODO: Implement JWT
    const token = {
      accessToken: '',
      refreshToken: '',
    };

    return {
      statusCode: HttpStatus.OK,
      data: {
        user,
        token,
      },
      message,
    };
  }
}
