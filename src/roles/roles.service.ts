import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
  ) {}

  async create(roleData: Partial<Role>): Promise<Role> {
    const role = this.rolesRepository.create(roleData);
    return await this.rolesRepository.save(role);
  }

  async findAll(): Promise<Role[]> {
    return await this.rolesRepository.find({ relations: ['permissions'] });
  }

  async findOneById(id: number): Promise<Role | null> {
    return await this.rolesRepository.findOne({ where: { id } });
  }

  async update(id: number, roleData: Partial<Role>): Promise<Role | null> {
    const role = await this.rolesRepository.findOne({ where: { id } });
    if (!role) {
      return null;
    }
    await this.rolesRepository.update(id, roleData);
    return await this.rolesRepository.findOne({
      where: { id },
      relations: ['permissions'],
    });
  }

  async remove(id: number): Promise<boolean> {
    const role = await this.rolesRepository.findOne({ where: { id } });
    if (!role) {
      return false;
    }
    await this.rolesRepository.softDelete(id);
    return true;
  }

  async findOne(options: FindOneOptions<Role>): Promise<Role | null> {
    return await this.rolesRepository.findOne(options);
  }

  async findOneOrFailed(options: FindOneOptions<Role>): Promise<Role> {
    const role = await this.findOne(options);
    if (!role) {
      throw new Error("Can't find role");
    }

    return role;
  }
}
