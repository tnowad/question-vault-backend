import { Injectable } from '@nestjs/common';
import { CreateConfigDto } from './dto/create-config.dto';
import { UpdateConfigDto } from './dto/update-config.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Config } from './entities/config.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
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

    this.cacheManager.store
      .keys('configs::*')
      .then((keys) => keys.forEach((key) => this.cacheManager.del(key)));

    return savedConfig;
  }

  async findAll(): Promise<Config[]> {
    const cacheKey = 'configs::all';
    const cachedConfigs = await this.cacheManager.get<Config[] | null>(
      cacheKey,
    );
    if (cachedConfigs) {
      return cachedConfigs;
    }

    const configs = await this.configsRepository.find();
    await this.cacheManager.set(cacheKey, configs, 6000);
    return configs;
  }

  async findOne(fields: FindOptionsWhere<Config>): Promise<Config | null> {
    const cacheKey = `configs::${JSON.stringify(fields)}`;
    const cachedConfig = await this.cacheManager.get<Config | null>(cacheKey);
    if (cachedConfig) {
      return cachedConfig;
    }

    const config = await this.configsRepository.findOne({ where: fields });
    await this.cacheManager.set(cacheKey, config, 60);
    return config;
  }

  async findOneOrFailed(fields: FindOptionsWhere<Config>): Promise<Config> {
    const config = await this.findOne(fields);
    if (!config) {
      throw new Error('Config not found');
    }

    return config;
  }

  async update(id: number, updateConfigDto: UpdateConfigDto): Promise<Config> {
    const config = await this.findOneOrFailed({ id });

    Object.assign(config, updateConfigDto);

    await this.configsRepository.save(config);

    this.cacheManager.del('configs::*');
    return config;
  }

  async remove(id: number): Promise<void> {
    const config = await this.findOneOrFailed({ id });
    await this.configsRepository.remove(config);

    this.cacheManager.del('configs::*');
  }
}
