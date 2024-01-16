import { Controller, Post } from '@nestjs/common';
import { AuthGithubService } from './auth-github.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth/github')
@Controller('auth/github')
export class AuthGithubController {
  constructor(private readonly authGithubService: AuthGithubService) {}

  @Post('sign-in')
  async signIn() {}

  @Post('callback')
  async callback() {}
}
