import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('addresses')
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 250 })
  state: string;

  @Column({ type: 'varchar', length: 250 })
  city: string;

  @Column({ type: 'varchar', length: 250 })
  address: string;

  @Column({ type: 'varchar', length: 500 })
  remark: string;

  @Column({ type: 'int' })
  longitude: number;

  @Column({ type: 'int' })
  latitude: number;

  @Column({ type: 'int' })
  postal_code: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  created_at: Date;

  @ManyToOne(() => User, (user) => user.addresses)
  owner: User;
}
