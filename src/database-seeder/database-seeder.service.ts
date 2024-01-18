import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from 'src/permissions/entities/permission.entity';
import { PermissionValue } from 'src/permissions/enums/permissions.enum';
import { Role } from 'src/roles/entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DatabaseSeederService implements OnModuleInit {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionsRepository: Repository<Permission>,
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
  ) {}
  async onModuleInit() {
    await this.seedPermissions();
    await this.seedRoles();
    return;
  }
  private async seedPermissions() {
    const permissions = Object.values(PermissionValue).map((permission) => ({
      value: permission,
    }));

    await this.permissionsRepository.createQueryBuilder().delete().execute();
    await this.permissionsRepository
      .createQueryBuilder()
      .insert()
      .into(Permission)
      .values(permissions)
      .execute();
  }

  private async seedRoles() {}
}
