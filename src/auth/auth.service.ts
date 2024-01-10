import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { JwtService } from '@nestjs/jwt';
import { Cache } from 'cache-manager';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async createAccessToken(user: User) {
    const payload = { sub: user.id };
    return this.jwtService.sign(payload);
  }

  async createRefreshToken(user: User) {
    const payload = { sub: user.id };
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
    });
    return refreshToken;
  }

  async createTokens(user: User) {
    const accessToken = await this.createAccessToken(user);
    const refreshToken = await this.createRefreshToken(user);
    return {
      accessToken,
      refreshToken,
    };
  }
}
