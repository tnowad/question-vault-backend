import { Exclude } from 'class-transformer';
import { IsOptional, MaxLength, IsDate, IsEmail } from 'class-validator';
import { Account } from 'src/accounts/entities/account.entity';
import {
  AfterLoad,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Generated,
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

  @OneToMany(() => Account, (account) => account.user)
  accounts: Account[];

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
