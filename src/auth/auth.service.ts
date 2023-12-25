import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { AuthLoginEmailDto } from './dto/auth-login-email.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) { }

  async validateLogin(authLoginEmailDto: AuthLoginEmailDto) {
    const user = await this.usersService.findOne({
      email: authLoginEmailDto.email,
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
      authLoginEmailDto.password,
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

    return {
      statusCode: HttpStatus.OK,
      message: 'Login successful',
    };
  }
}
