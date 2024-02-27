import { Module } from '@nestjs/common';
import { DatabaseSeederService } from './database-seeder.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from 'src/permissions/entities/permission.entity';
import { Role } from 'src/roles/entities/role.entity';
import { Account } from 'src/accounts/entities/account.entity';
import { User } from 'src/users/entities/user.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Permission, Role, User, Account]),
    ConfigModule,
  ],
  providers: [DatabaseSeederService],
})
export class DatabaseSeederModule {}
