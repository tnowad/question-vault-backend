import { Module } from '@nestjs/common';
import { ConfigsService } from './configs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Config } from './entities/config.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Config])],
  providers: [ConfigsService],
})
export class ConfigsModule {}
