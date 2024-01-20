import { Permission } from 'src/permissions/entities/permission.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'roles' })
export class Role {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: String })
  name: string;

  @ManyToMany(() => Permission, (permission: Permission) => permission.roles, {
    createForeignKeyConstraints: false,
  })
  @JoinTable({
    name: 'roles_permissions',
    joinColumn: { name: 'roleId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'permissionId', referencedColumnName: 'id' },
  })
  permissions: Permission[];

  @ManyToMany(() => User, (user: User) => user.roles)
  users: User[];

  @ManyToMany(() => Role, (role: Role) => role.constrainedRoles)
  @JoinTable({
    name: 'roles_roles',
    joinColumn: { name: 'roleId', referencedColumnName: 'id' },
    inverseJoinColumn: {
      name: 'constrainedRoleId',
      referencedColumnName: 'id',
    },
  })
  constrainedRoles: Role[];

  @ManyToMany(() => Role, (role) => role.childRoles, {
    cascade: ['insert', 'update', 'remove'],
    createForeignKeyConstraints: false,
    onDelete: 'RESTRICT',
  })
  @JoinTable({
    name: 'role_parents',
    joinColumn: { name: 'childRoleId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'parentRoleId', referencedColumnName: 'id' },
  })
  parentRoles: Role[];

  @ManyToMany(() => Role, (role) => role.parentRoles)
  childRoles: Role[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
