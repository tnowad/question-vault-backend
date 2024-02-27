import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'configs' })
export class Config {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  @Generated('uuid')
  uuid: string;

  @Column({ unique: true })
  key: string;

  @Column()
  value: string;
}
