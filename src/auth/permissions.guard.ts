import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Permissions } from './permissions.decorator';

export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const permissions = this.reflector.get(Permissions, context.getHandler());

    if (!permissions) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const isAllowed = permissions.some((permission) =>
      user.permissions.includes(permission),
    );

    return isAllowed;
  }
}
