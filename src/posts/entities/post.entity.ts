import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: String })
  title: string;

  @Column({ type: String })
  body: string;

  @Column({ type: Number })
  viewCount: number;

  @Column({ type: Number })
  score: number;

  @JoinColumn({ name: 'ownerUserId' })
  ownerUser: User;

  @Column({ type: Number })
  ownerUserId: number;

  @JoinColumn({ name: 'lastEditorUserId' })
  lastEditorUser: User;

  @Column({ type: Number })
  lastEditorUserId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
