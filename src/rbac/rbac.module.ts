import { Module } from '@nestjs/common';
import { RbacService } from './rbac.service';
import { RolesModule } from 'src/roles/roles.module';
import { PermissionsModule } from 'src/permissions/permissions.module';
import { RbacController } from './rbac.controller';

@Module({
  imports: [RolesModule, PermissionsModule],
  providers: [RbacService],
  controllers: [RbacController],
})
export class RbacModule {}
