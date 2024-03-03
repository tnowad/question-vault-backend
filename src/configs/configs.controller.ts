import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ConfigsService } from './configs.service';
import { CreateConfigDto } from './dto/create-config.dto';
import { UpdateConfigDto } from './dto/update-config.dto';
import { Config } from './entities/config.entity';

@Controller('configs')
export class ConfigsController {
  constructor(private readonly configsService: ConfigsService) {}

  @Post()
  async create(@Body() createConfigDto: CreateConfigDto): Promise<Config> {
    return await this.configsService.create(createConfigDto);
  }

  @Get()
  async findAll(): Promise<Config[]> {
    return await this.configsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Config> {
    return await this.configsService.findOneOrFailed({ id: +id });
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateConfigDto: UpdateConfigDto,
  ): Promise<Config> {
    return await this.configsService.update(+id, updateConfigDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return await this.configsService.remove(+id);
  }
}
