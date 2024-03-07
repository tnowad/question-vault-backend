import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { PermissionValue } from 'src/permissions/enums/permissions.enum';
import { Role } from 'src/roles/entities/role.entity';
import { RolesService } from 'src/roles/roles.service';
import { Cache } from 'cache-manager';

@Injectable()
export class RbacService {
  constructor(
    private readonly rolesService: RolesService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}
  async getLookupAllRoles(role: Role, roles: Role[] = []): Promise<Role[]> {
    role = (await this.rolesService.findOne({
      where: { id: role.id },
      relations: { parentRoles: true, permissions: true },
      cache: { id: `role::${role.id}`, milliseconds: 60000 },
    })) as Role;

    if (!roles.find((r) => r.id === role.id)) {
      roles.push(role);

      if (role.parentRoles && role.parentRoles.length > 0) {
        for (const parentRole of role.parentRoles) {
          await this.getLookupAllRoles(parentRole, roles);
        }
      }
    }

    return roles;
  }

  async getPermissions(roleValue: string): Promise<PermissionValue[]> {
    const cacheKey = `rbac::permissions::${roleValue}`;
    if (await this.cacheManager.get(cacheKey)) {
      return (await this.cacheManager.get(cacheKey)) ?? [];
    }
    const role = await this.rolesService.findOne({
      where: { value: roleValue },
      relations: { parentRoles: true },
    });

    if (!role) {
      return [];
    }

    const roles = await this.getLookupAllRoles(role);

    const permissions = roles.reduce<PermissionValue[]>((acc, role) => {
      if (role.permissions) {
        return [...acc, ...role.permissions.map((p) => p.value)];
      }
      return acc;
    }, []);

    await this.cacheManager.set(cacheKey, permissions, 60000);

    return permissions;
  }

  async hasPermission(
    role: string,
    permission: PermissionValue,
  ): Promise<boolean> {
    const permissions = await this.getPermissions(role);
    return permissions.includes(permission);
  }

  async hasPermissions(
    role: string,
    permissions: PermissionValue[],
  ): Promise<boolean> {
    const rolePermissions = await this.getPermissions(role);
    return permissions.every((permission) =>
      rolePermissions.includes(permission),
    );
  }
}
