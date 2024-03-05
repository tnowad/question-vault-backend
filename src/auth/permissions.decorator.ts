import { Reflector } from '@nestjs/core';
import { PermissionValue } from 'src/permissions/enums/permissions.enum';

export const Permissions = Reflector.createDecorator<PermissionValue[]>();
