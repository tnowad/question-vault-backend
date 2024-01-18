import { Module } from '@nestjs/common';
import { DatabaseSeederService } from './database-seeder.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from 'src/permissions/entities/permission.entity';
import { Role } from 'src/roles/entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Permission, Role])],
  providers: [DatabaseSeederService],
})
export class DatabaseSeederModule {}
