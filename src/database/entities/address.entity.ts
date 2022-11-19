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

  @Column({ type: 'varchar', length: 500, nullable: true })
  remark?: string;

  @Column({ type: 'varchar', length: 250, nullable: true })
  longitude?: string;

  @Column({ type: 'varchar', length: 250, nullable: true })
  latitude?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  postal_code?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  created_at: Date;

  @ManyToOne(() => User, (user) => user.addresses)
  owner: User;
}
