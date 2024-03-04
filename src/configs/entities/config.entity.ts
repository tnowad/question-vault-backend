import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';
import { ConfigKey } from '../enums/config.enum';

@Entity({ name: 'configs' })
export class Config {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  @Generated('uuid')
  uuid: string;

  @Column({ unique: true })
  key: ConfigKey;

  @Column()
  value: string;
}
