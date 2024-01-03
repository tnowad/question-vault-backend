import { Module } from '@nestjs/common';
import { AuthEmailService } from './auth-email.service';
import { AuthEmailController } from './auth-email.controller';

@Module({
  providers: [AuthEmailService],
  controllers: [AuthEmailController]
})
export class AuthEmailModule {}
