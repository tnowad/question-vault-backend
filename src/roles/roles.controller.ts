import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { Role } from './entities/role.entity';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  async create(@Body() roleData: Partial<Role>): Promise<Role> {
    try {
      return await this.rolesService.create(roleData);
    } catch (error) {
      throw new BadRequestException("Couldn't create role");
    }
  }

  @Get()
  async findAll(): Promise<Role[]> {
    return await this.rolesService.findAll();
  }

  @Get(':id')
  async findOneById(@Param('id') id: string): Promise<Role> {
    const role = await this.rolesService.findOneById(parseInt(id, 10));
    if (!role) {
      throw new NotFoundException('Role not found');
    }
    return role;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() roleData: Partial<Role>,
  ): Promise<Role> {
    const updatedRole = await this.rolesService.update(
      parseInt(id, 10),
      roleData,
    );
    if (!updatedRole) {
      throw new NotFoundException('Role not found');
    }
    return updatedRole;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ deleted: boolean }> {
    const deleted = await this.rolesService.remove(parseInt(id, 10));
    if (!deleted) {
      throw new NotFoundException('Role not found');
    }
    return { deleted: true };
  }
}
