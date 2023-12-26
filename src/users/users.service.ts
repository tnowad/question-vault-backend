import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';

import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';

const saltRounds = 10;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser !== null) {
      throw new BadRequestException('User already exists');
    }

    const passwordHash = await bcrypt.hash(createUserDto.password, saltRounds);

    createUserDto.password = passwordHash;

    const user = this.usersRepository.create(createUserDto);

    await this.usersRepository.save(user);

    return user;
  }

  async findAll(
    paginationOptions: IPaginationOptions,
    search?: string,
  ): Promise<Pagination<User>> {
    const queryBuilder = this.usersRepository
      .createQueryBuilder('user')
      .select(['user.id', 'user.fullName', 'user.email']);

    if (search) {
      queryBuilder.where('user.fullName LIKE :search', {
        search: `%${search}%`,
      });
    }

    return paginate<User>(queryBuilder, paginationOptions);
  }

  async findOne(fields: FindOptionsWhere<User>): Promise<User> {
    const user = await this.usersRepository.findOneBy(fields);

    if (user === null) {
      throw new BadRequestException('User not found');
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (updateUserDto.oldPassword && updateUserDto.newPassword) {
      const isPasswordValid = await bcrypt.compare(
        updateUserDto.oldPassword,
        user.password,
      );
      if (!isPasswordValid) {
        throw new BadRequestException('Old password is incorrect');
      }
      updateUserDto.password = await bcrypt.hash(
        updateUserDto.newPassword,
        saltRounds,
      );
    }

    const updatedUser = this.usersRepository.merge(user, updateUserDto);
    return this.usersRepository.save(updatedUser);
  }

  async remove(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return this.usersRepository.remove(user);
  }
}
