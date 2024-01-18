import { Role } from 'src/roles/entities/role.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PermissionValue } from '../enums/permissions.enum';

@Entity({ name: 'permissions' })
export class Permission {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'enum', enum: PermissionValue, unique: true })
  value: PermissionValue;

  @ManyToMany(() => Role, (role: Role) => role.permissions)
  roles: Role[];
}
