import { IsOptional, MaxLength, IsDate } from 'class-validator';
import { Account } from 'src/accounts/entities/account.entity';
import { Role } from 'src/roles/entities/role.entity';

import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Generated,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  @Generated('uuid')
  uuid: string;

  @Column({ type: String, nullable: true })
  fullName: string;

  @Column({ length: 32, nullable: true })
  @MaxLength(32)
  phone: string;

  @Column({ unique: true })
  username: string;

  @OneToMany(() => Account, (account) => account.user)
  accounts: Account[];

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'users_roles',
    joinColumn: { name: 'userId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'roleId', referencedColumnName: 'id' },
  })
  roles: Role[];

  @Column({ type: 'date', nullable: true })
  @IsOptional()
  @IsDate()
  birthdate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
