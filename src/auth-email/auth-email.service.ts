import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { AuthEmailSignInDto } from './dto/auth-email-sign-in.dto';
import { AuthEmailSignUpDto } from './dto/auth-email-sign-up.dto';
import * as bcrypt from 'bcryptjs';
import { AccountsService } from 'src/accounts/accounts.service';
import { UsersService } from 'src/users/users.service';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { Account } from 'src/accounts/entities/account.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthEmailService {
  constructor(
    private readonly accountsService: AccountsService,
    private readonly usersService: UsersService,
    @InjectDataSource() private dataSource: DataSource,
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

  async signUp(authEmailSignInDto: AuthEmailSignUpDto) {
    const { email, password, fullName, phone, username } = authEmailSignInDto;

    const userExists = await this.usersService.findOne({
      username,
    });

    if (userExists) {
      throw new ConflictException(
        'User with username already exists, please sign in',
      );
    }

    const accountExists = await this.accountsService.findOne({
      provider: 'email',
      providerAccountId: email,
    });

    if (accountExists) {
      throw new ConflictException(
        'Account with email already exists, please use another email',
      );
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      await queryRunner.startTransaction();

      const user = queryRunner.manager.getRepository(User).create({
        username,
        fullName,
        phone,
      });

      await queryRunner.manager.getRepository(User).save(user);

      if (!user) {
        throw new InternalServerErrorException(
          "Can't create user, please try again",
        );
      }

      const account = queryRunner.manager.getRepository(Account).create({
        type: 'credentials',
        provider: 'email',
        providerAccountId: email,
        user,
        password,
      });

      await queryRunner.manager.getRepository(Account).save(account);

      if (!account) {
        throw new InternalServerErrorException(
          "Can't create account, please try again",
        );
      }

      await queryRunner.commitTransaction();
      return user;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
