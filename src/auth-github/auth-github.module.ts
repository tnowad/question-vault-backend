import { Module } from '@nestjs/common';
import { AuthGithubController } from './auth-github.controller';
import { AuthGithubService } from './auth-github.service';

@Module({
  controllers: [AuthGithubController],
  providers: [AuthGithubService],
})
export class AuthGithubModule {}
