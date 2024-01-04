import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account) private accountsRepository: Repository<Account>,
  ) {}

  async findOne(fields: FindOptionsWhere<Account>): Promise<Account> {
    const account = await this.accountsRepository.findOneBy(fields);

    if (account === null) {
      throw new BadRequestException('Account not found');
    }

    return account;
  }
}
