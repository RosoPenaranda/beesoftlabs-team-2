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
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 250 })
  state: string;

  @Column({ type: 'varchar', length: 250 })
  city: string;

  @Column({ type: 'varchar', length: 250 })
  address: string;

  @Column({ type: 'varchar', length: 250 })
  remark: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @Column({ type: 'int' })
  longitud: number;

  @Column({ type: 'int' })
  latitud: number;

  @Column({ type: 'int' })
  postal_code: number;

  @ManyToOne(() => User, (user) => user.addresses)
  owner: User;
}
