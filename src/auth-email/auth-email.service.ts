import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthEmailSignInDto } from './dto/auth-email-sign-in.dto';
import { AuthEmailSignUpDto } from './dto/auth-email-sign-up.dto';
import * as bcrypt from 'bcryptjs';
import { AccountsService } from 'src/accounts/accounts.service';

@Injectable()
export class AuthEmailService {
  constructor(private readonly accountsService: AccountsService) {}

  async signIn(authEmailSignInDto: AuthEmailSignInDto) {
    const { email, password } = authEmailSignInDto;

    const account = await this.accountsService.findOne({
      provider: 'email',
      providerAccountId: email,
    });

    if (!account.password) {
      throw new NotFoundException('Password not set');
    }

    const isValidPassword = await bcrypt.compare(password, account.password);

    if (!isValidPassword) {
      throw new NotFoundException('Invalid password');
    }

    const user = account.user;

    return user;
  }

