import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Service } from './service.entity';
import { User } from './user.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date', nullable: true })
  start_time: Date | null;

  @Column({ type: 'date', nullable: true })
  end_time: Date | null;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @Column({ type: 'float' })
  total_price: number;

  @ManyToMany(() => Service)
  @JoinTable()
  services: Service[];

  @ManyToOne(() => User, (user) => user.orders)
  customer: User;
}
