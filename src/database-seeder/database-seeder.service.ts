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

  private async seedRoles() {
    await this.rolesRepository
      .createQueryBuilder()
      .delete()
      .from(Role)
      .execute();

    const existingPermissions = await this.permissionsRepository.find();

    const permissions = existingPermissions.reduce(
      (acc, permission) => {
        acc[permission.value] = permission;
        return acc;
      },
      {} as Record<PermissionValue, Permission>,
    );

    const anonymousRole = new Role();
    anonymousRole.name = 'Anonymous';
    anonymousRole.permissions = [
      PermissionValue.AUTH_EMAIL_SIGNIN,
      PermissionValue.AUTH_EMAIL_SIGNUP,
      PermissionValue.AUTH_EMAIL_FORGOT_PASSWORD,
      PermissionValue.AUTH_EMAIL_RESET_PASSWORD,
    ].map((permission) => permissions[permission]);
    anonymousRole.parentRoles = [];

    const userRole = new Role();
    userRole.name = 'User';
    userRole.permissions = [PermissionValue.AUTH_SIGNOUT].map(
      (permission) => permissions[permission],
    );
    userRole.parentRoles = [anonymousRole];

    const juniorUserRole = new Role();
    juniorUserRole.name = 'Junior User';
    juniorUserRole.permissions = [];
    juniorUserRole.parentRoles = [userRole];

    const middleUserRole = new Role();
    middleUserRole.name = 'Middle User';
    middleUserRole.permissions = [];
    middleUserRole.parentRoles = [juniorUserRole];

    const seniorUserRole = new Role();
    seniorUserRole.name = 'Senior User';
    seniorUserRole.permissions = [];
    seniorUserRole.parentRoles = [middleUserRole];

    const moderatorRole = new Role();
    moderatorRole.name = 'Moderator';
    moderatorRole.permissions = [PermissionValue.VIEW_ADMIN_PANEL].map(
      (permission) => permissions[permission],
    );
    moderatorRole.parentRoles = [userRole];

    const contentModeratorRole = new Role();
    contentModeratorRole.name = 'Content Moderator';
    contentModeratorRole.permissions = [];
    contentModeratorRole.parentRoles = [moderatorRole, seniorUserRole];

    const roleModeratorRole = new Role();
    roleModeratorRole.name = 'Role Moderator';
    roleModeratorRole.permissions = [];
    roleModeratorRole.parentRoles = [moderatorRole];

    const accountModeratorRole = new Role();
    accountModeratorRole.name = 'Account Moderator';
    accountModeratorRole.permissions = [];
    accountModeratorRole.parentRoles = [moderatorRole];

    const userModeratorRole = new Role();
    userModeratorRole.name = 'User Moderator';
    userModeratorRole.permissions = [];
    userModeratorRole.parentRoles = [moderatorRole];

    const systemModeratorRole = new Role();
    systemModeratorRole.name = 'System Moderator';
    systemModeratorRole.permissions = [];
    systemModeratorRole.parentRoles = [moderatorRole];

    const supervisorRole = new Role();
    supervisorRole.name = 'Supervisor';
    supervisorRole.permissions = [];
    supervisorRole.parentRoles = [
      systemModeratorRole,
      contentModeratorRole,
      accountModeratorRole,
      userModeratorRole,
    ];

    const administratorRole = new Role();
    administratorRole.name = 'Administrator';
    administratorRole.permissions = [];
    administratorRole.parentRoles = [supervisorRole, roleModeratorRole];
    const roles = [
      anonymousRole,
      userRole,
      juniorUserRole,
      middleUserRole,
      seniorUserRole,
      moderatorRole,
      contentModeratorRole,
      roleModeratorRole,
      accountModeratorRole,
      userModeratorRole,
      systemModeratorRole,
      supervisorRole,
      administratorRole,
    ];

    await this.rolesRepository.save(roles);

    console.log(
      await this.rolesRepository.find({
        relations: {
          parentRoles: true,
          childRoles: true,
          permissions: true,
        },
      }),
    );
  }
}
