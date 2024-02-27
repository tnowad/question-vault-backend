import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateConfigDto } from './dto/create-config.dto';
import { UpdateConfigDto } from './dto/update-config.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Config } from './entities/config.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ConfigsService {
  constructor(
    @InjectRepository(Config)
    private readonly configsRepository: Repository<Config>,
  ) {}
  async create(createConfigDto: CreateConfigDto): Promise<Config> {
    const config = this.configsRepository.create(createConfigDto);
    return await this.configsRepository.save(config);
  }

  async findAll(): Promise<Config[]> {
    return await this.configsRepository.find();
  }

  async findOne(id: number): Promise<Config> {
    const config = await this.configsRepository.findOneBy({ id });
    if (!config) {
      throw new NotFoundException(`Config with id ${id} not found`);
    }
    return config;
  }

  async update(id: number, updateConfigDto: UpdateConfigDto): Promise<Config> {
    const config = await this.findOne(id);
    Object.assign(config, updateConfigDto);
    return await this.configsRepository.save(config);
  }

  async remove(id: number): Promise<void> {
    const config = await this.findOne(id);
    await this.configsRepository.remove(config);
  }
}
