import { Exclude } from 'class-transformer';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  BeforeInsert,
  AfterLoad,
  BeforeUpdate,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Entity('accounts')
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  provider: string;

  @Column({ name: 'providerAccountId' })
  providerAccountId: string;

  @Column({ nullable: true })
  refreshToken?: string;

  @Column({ nullable: true })
  accessToken?: string;

  @Column({ type: 'bigint', nullable: true })
  expiresAt?: number;

  @Column({ nullable: true })
  idToken?: string;

  @Column({ nullable: true })
  scope?: string;

  @Column({ nullable: true })
  sessionState?: string;

  @Column({ nullable: true })
  tokenType?: string;

  @Column({ nullable: true })
  password?: string;

  @ManyToOne(() => User, (user) => user.accounts)
  user: User;

  @Exclude({ toPlainOnly: true })
  public previousPassword?: string;

  @AfterLoad()
  public loadPreviousPassword(): void {
    this.previousPassword = this.password;
  }

  @BeforeInsert()
  @BeforeUpdate()
  async setPassword() {
    if (this.provider !== 'email' || !this.password) {
      return;
    }
    if (this.previousPassword !== this.password && this.password) {
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, salt);
    }
  }
}
