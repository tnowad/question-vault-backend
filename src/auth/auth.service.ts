import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { SignInDto } from './dto/sign-in.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { SignUpDto } from './dto/sign-up.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) { }

  async signIn(signInDto: SignInDto) {
    const user = await this.usersService.findOne({
      email: signInDto.email,
    });

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            email: 'User not found',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const isPasswordValid = await bcrypt.compare(
      signInDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            password: 'Incorrect password',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const payload = { sub: user.id, email: user.email };

    return {
      statusCode: HttpStatus.OK,
      message: 'Login successful',
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(signUpDto: SignUpDto) {
    const candidate = await this.usersService.findOne({
      email: signUpDto.email,
    });

    if (candidate) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            email: 'User already exists',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const user = await this.usersService.create(signUpDto);

    return {
      statusCode: HttpStatus.CREATED,
      message: 'User created successfully',
      user,
    };
  }
}
