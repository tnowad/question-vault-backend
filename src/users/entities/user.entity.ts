import { Exclude } from 'class-transformer';
import { IsOptional, MaxLength, IsDate, IsEmail } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  fullName: string;

  @Column({ length: 32, nullable: true })
  @MaxLength(32)
  phone: string;

  @Column({ length: 32, nullable: true, unique: true })
  @MaxLength(32)
  username: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column({ length: 128 })
  @MaxLength(128)
  @IsOptional()
  @Exclude()
  password: string;

  @Column({ type: 'date', nullable: true })
  @IsOptional()
  @IsDate()
  birthdate: Date;
}