import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { PermissionValue } from 'src/permissions/enums/permissions.enum';
import { AuthGuard } from './auth.guard';
import { PermissionsGuard } from './permissions.guard';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';

export function Auth(...permissions: PermissionValue[]) {
  return applyDecorators(
    SetMetadata('permissions', permissions),
    UseGuards(AuthGuard, PermissionsGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}
