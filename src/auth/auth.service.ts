import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { SignInDto } from './dto/sign-in.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { JwtService } from '@nestjs/jwt';
import { Cache } from 'cache-manager';
import { User } from 'src/users/entities/user.entity';
import { UserNotFoundException } from 'src/common/exceptions/user-not-found.exception';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async validateUser(signInDto: SignInDto): Promise<User> {
    const { email, password } = signInDto;
    const user = await this.usersService.findOne({ email });

    if (!user) {
      throw new UserNotFoundException();
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UserNotFoundException();
    }

    // Todo: Update last login date

    return user;
  }
}
