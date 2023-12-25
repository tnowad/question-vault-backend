import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginEmailDto } from './dto/auth-login-email.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  login(@Body() authLoginEmailDto: AuthLoginEmailDto) {
    return this.authService.validateLogin(authLoginEmailDto);
  }
}
