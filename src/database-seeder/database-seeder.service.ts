import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/accounts/entities/account.entity';
import { Permission } from 'src/permissions/entities/permission.entity';
import { PermissionValue } from 'src/permissions/enums/permissions.enum';
import { Role } from 'src/roles/entities/role.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DatabaseSeederService implements OnModuleInit {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionsRepository: Repository<Permission>,
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Account)
    private readonly accountsRepository: Repository<Account>,
  ) {}
  async onModuleInit() {
    if (process.env.NODE_ENV === 'production') {
      return;
    }
    await this.seedPermissions();
    await this.seedRoles();
    await this.seedUsers();
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
    anonymousRole.value = 'ANONYMOUS';
    anonymousRole.permissions = [
      PermissionValue.AUTH_EMAIL_SIGNIN,
      PermissionValue.AUTH_EMAIL_SIGNUP,
      PermissionValue.AUTH_EMAIL_FORGOT_PASSWORD,
      PermissionValue.AUTH_EMAIL_RESET_PASSWORD,
    ].map((permission) => permissions[permission]);
    anonymousRole.parentRoles = [];

    const userRole = new Role();
    userRole.name = 'User';
    userRole.value = 'USER';
    userRole.permissions = [PermissionValue.AUTH_SIGNOUT].map(
      (permission) => permissions[permission],
    );
    userRole.parentRoles = [anonymousRole];

    const juniorUserRole = new Role();
    juniorUserRole.name = 'Junior User';
    juniorUserRole.value = 'JUNIOR_USER';
    juniorUserRole.permissions = [];
    juniorUserRole.parentRoles = [userRole];

    const middleUserRole = new Role();
    middleUserRole.name = 'Middle User';
    middleUserRole.value = 'MIDDLE_USER';
    middleUserRole.permissions = [];
    middleUserRole.parentRoles = [juniorUserRole];

    const seniorUserRole = new Role();
    seniorUserRole.name = 'Senior User';
    seniorUserRole.value = 'SENIOR_USER';
    seniorUserRole.permissions = [];
    seniorUserRole.parentRoles = [middleUserRole];

    const moderatorRole = new Role();
    moderatorRole.name = 'Moderator';
    moderatorRole.value = 'MODERATOR';
    moderatorRole.permissions = [PermissionValue.VIEW_ADMIN_PANEL].map(
      (permission) => permissions[permission],
    );
    moderatorRole.parentRoles = [userRole];

    const contentModeratorRole = new Role();
    contentModeratorRole.name = 'Content Moderator';
    contentModeratorRole.value = 'CONTENT_MODERATOR';
    contentModeratorRole.permissions = [];
    contentModeratorRole.parentRoles = [moderatorRole, seniorUserRole];

    const roleModeratorRole = new Role();
    roleModeratorRole.name = 'Role Moderator';
    roleModeratorRole.value = 'ROLE_MODERATOR';
    roleModeratorRole.permissions = [];
    roleModeratorRole.parentRoles = [moderatorRole];

    const accountModeratorRole = new Role();
    accountModeratorRole.name = 'Account Moderator';
    accountModeratorRole.value = 'ACCOUNT_MODERATOR';
    accountModeratorRole.permissions = [];
    accountModeratorRole.parentRoles = [moderatorRole];

    const userModeratorRole = new Role();
    userModeratorRole.name = 'User Moderator';
    userModeratorRole.value = 'USER_MODERATOR';
    userModeratorRole.permissions = [];
    userModeratorRole.parentRoles = [moderatorRole];

    const systemModeratorRole = new Role();
    systemModeratorRole.name = 'System Moderator';
    systemModeratorRole.value = 'SYSTEM_MODERATOR';
    systemModeratorRole.permissions = [];
    systemModeratorRole.parentRoles = [moderatorRole];

    const supervisorRole = new Role();
    supervisorRole.name = 'Supervisor';
    supervisorRole.value = 'SUPERVISOR';
    supervisorRole.permissions = [];
    supervisorRole.parentRoles = [
      systemModeratorRole,
      contentModeratorRole,
      accountModeratorRole,
      userModeratorRole,
    ];

    const administratorRole = new Role();
    administratorRole.name = 'Administrator';
    administratorRole.value = 'ADMINISTRATOR';
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
  }

  async seedUsers() {
    await this.usersRepository.createQueryBuilder().delete().execute();

    const roles = await this.rolesRepository.find();
    const rolesMap = roles.reduce(
      (acc, role) => {
        acc[role.value] = role;
        return acc;
      },
      {} as Record<string, Role>,
    );

    const administratorUser = new User();
    administratorUser.roles = [rolesMap.ADMINISTRATOR];
    administratorUser.fullName = 'Administrator';
    administratorUser.username = 'admin';
    const administratorEmailAccount = new Account();
    administratorEmailAccount.providerAccountId = 'admin@admin.com';
    administratorEmailAccount.provider = 'email';
    administratorEmailAccount.type = 'credentials';
    administratorEmailAccount.password = 'Password123';
    administratorUser.accounts = [administratorEmailAccount];
    const users = [administratorUser];

    await this.usersRepository.save(users);
  }
}
