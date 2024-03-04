import { CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Permissions } from './permissions.decorator';
import { ConfigsService } from 'src/configs/configs.service';
import { RolesService } from 'src/roles/roles.service';
import { User } from 'src/users/entities/user.entity';
import { ConfigKey } from 'src/configs/enums/config.enum';
import { PermissionValue } from 'src/permissions/enums/permissions.enum';

export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(ConfigsService) private readonly configsService: ConfigsService,
    @Inject(RolesService) private readonly rolesService: RolesService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const permissions = this.reflector.get(
      Permissions,
      context.getHandler(),
    ) as PermissionValue[] | undefined;

    if (!permissions) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user as User | undefined;

    const userPermissions = user
      ? user.roles.flatMap((role) =>
          role.permissions.map((permission) => permission.value),
        )
      : await this.getDefaultUserPermissions();

    return permissions.some((permission) =>
      userPermissions.includes(permission),
    );
  }

  private async getDefaultUserPermissions(): Promise<string[]> {
    const defaultConfigRole = await this.configsService.findOne({
      key: ConfigKey.ROLE_DEFAULT_USER_ANONYMOUS,
    });

    if (!defaultConfigRole) {
      return [];
    }

    const defaultRole = await this.rolesService.findOne({
      value: defaultConfigRole.key,
    });

    return defaultRole
      ? defaultRole.permissions.map((permission) => permission.value)
      : [];
  }
}
