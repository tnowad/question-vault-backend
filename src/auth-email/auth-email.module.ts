import { Module } from '@nestjs/common';
import { AuthEmailService } from './auth-email.service';
import { AuthEmailController } from './auth-email.controller';
import { AccountsModule } from 'src/accounts/accounts.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [AccountsModule, UsersModule],
  providers: [AuthEmailService],
  controllers: [AuthEmailController],
})
export class AuthEmailModule {}
