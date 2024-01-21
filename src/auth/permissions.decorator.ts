import { Reflector } from '@nestjs/core';
import { Permission } from 'src/permissions/entities/permission.entity';
import { PermissionValue } from 'src/permissions/enums/permissions.enum';

export const Permissions = Reflector.createDecorator<PermissionValue[]>();
