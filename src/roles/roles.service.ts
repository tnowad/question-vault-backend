import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private readonly rolesRepository: Repository<Role>,
  ) {}

  async findOne(fields: FindOptionsWhere<Role>): Promise<Role | null> {
    return await this.rolesRepository.findOne({ where: fields });
  }

  async findOneOrFailed(fields: FindOptionsWhere<Role>): Promise<Role> {
    const role = await this.findOne(fields);
    if (!role) {
      throw new Error("Can't find role");
    }

    return role;
  }
}
