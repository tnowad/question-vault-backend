import { Controller, Get } from '@nestjs/common';
import { RbacService } from './rbac.service';

@Controller('rbac')
export class RbacController {
  constructor(private readonly rbacService: RbacService) {}
  @Get('/')
  async getRbac() {
    return await this.rbacService.getPermissions('ADMINISTRATOR');
  }
}
