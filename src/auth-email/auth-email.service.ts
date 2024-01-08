import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthEmailSignInDto } from './dto/auth-email-sign-in.dto';
import { AuthEmailSignUpDto } from './dto/auth-email-sign-up.dto';
import * as bcrypt from 'bcryptjs';
import { AccountsService } from 'src/accounts/accounts.service';
import { UsersService } from 'src/users/users.service';
import { CreateAccountDto } from 'src/accounts/dto/create-account.dto';

@Injectable()
export class AuthEmailService {
  constructor(
    private readonly accountsService: AccountsService,
    private readonly usersService: UsersService,
  ) {}

  async signIn(authEmailSignInDto: AuthEmailSignInDto) {
    const { email, password } = authEmailSignInDto;

    const account = await this.accountsService.findOne({
      provider: 'email',
      providerAccountId: email,
    });

    if (!account) {
      return null;
    }

    if (!account.password) {
      throw new NotFoundException('Password not set');
    }

    const isValidPassword = await bcrypt.compare(password, account.password);

    if (!isValidPassword) {
      throw new NotFoundException('Invalid password');
    }

    const user = account.user;

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async signUp(authEmailSignUpDto: AuthEmailSignUpDto) {
    const { email, password } = authEmailSignUpDto;
    const existingAccount = await this.accountsService.findOne({
      provider: 'email',
      providerAccountId: email,
    });
    if (existingAccount) {
      throw new NotFoundException('Account already exists');
    }

    const user = await this.usersService.create(authEmailSignUpDto);

    const newAccount = await this.accountsService.create({
      type: 'credentials',
      provider: 'email',
      providerAccountId: email,
      userId: user.id,
      password,
    });

    return newAccount;
  }
}
