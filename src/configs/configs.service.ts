import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateConfigDto } from './dto/create-config.dto';
import { UpdateConfigDto } from './dto/update-config.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Config } from './entities/config.entity';
import { Repository } from 'typeorm';
import { Cache } from 'cache-manager';
import { Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class ConfigsService {
  constructor(
    @InjectRepository(Config)
    private readonly configsRepository: Repository<Config>,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}
  async create(createConfigDto: CreateConfigDto): Promise<Config> {
    const config = this.configsRepository.create(createConfigDto);
    const savedConfig = await this.configsRepository.save(config);
    await this.cacheManager.del('configs');
    return savedConfig;
  }

  async findAll(): Promise<Config[]> {
    const cacheKey = 'configs';
    const cachedConfigs = await this.cacheManager.get<Config[] | null>(
      cacheKey,
    );
    if (cachedConfigs) {
      return cachedConfigs;
    }

    const configs = await this.configsRepository.find();
    await this.cacheManager.set(cacheKey, configs, 60);
    return configs;
  }


  async findOne(id: number): Promise<Config> {
    const cacheKey = `config_${id}`;
    const cachedConfig = await this.cacheManager.get<Config | null>(cacheKey);
    if (cachedConfig) {
      return cachedConfig;
    }

    const config = await this.configsRepository.findOneBy({ id });
    if (!config) {
      throw new NotFoundException(`Config with id ${id} not found`);
    }
    await this.cacheManager.set(cacheKey, config, 60);
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
