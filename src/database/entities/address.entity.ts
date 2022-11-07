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

  @Column({ type: 'varchar', length: 250 })
  remark: string;

  @Column({ type: 'int' })
  length: number;

  @Column({ type: 'int' })
  latitude: number;

  @Column({ type: 'int' })
  postal_code: number;

  @ManyToOne(() => User, (user) => user.addresses)
  owner: User;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp'})
  created_at: Date;
}
