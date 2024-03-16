import { Injectable } from '@nestjs/common';
import { PermissionValue } from 'src/permissions/enums/permissions.enum';

@Injectable()
export class RbacService {
  constructor() {}

  async getPermissions(role: string): Promise<PermissionValue[]> {
    console.log('role', role);
    // get all parent roles for the role
    // get all permissions for the role
    // get all permissions for the parent roles
    // return all permissions
    return [];
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
