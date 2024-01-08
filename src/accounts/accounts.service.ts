import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateAccountDto } from './dto/create-account.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account) private accountsRepository: Repository<Account>,
    private usersService: UsersService,
  ) {}

  async findOne(fields: FindOptionsWhere<Account>): Promise<Account | null> {
    const account = await this.accountsRepository.findOneBy(fields);
    return account;
  }

  async create(createAccountDto: CreateAccountDto): Promise<Account | null> {
    const { provider, providerAccountId, userId } = createAccountDto;

    const user = await this.usersService.findOne({
      id: userId,
    });

    const existingAccount = await this.accountsRepository.findOne({
      where: { provider, providerAccountId },
    });

    if (existingAccount !== null) {
      throw new BadRequestException('Account already exists');
    }

    const account = this.accountsRepository.create({
      ...createAccountDto,
      user,
    });

    return await this.accountsRepository.save(account);
  }
}
