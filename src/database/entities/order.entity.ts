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
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date', nullable: true })
  start_time: Date | null;

  @Column({ type: 'date', nullable: true })
  end_time: Date | null;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @Column({ type: 'varchar', length: 250 })
  total_price: string;

  @ManyToMany(() => Service)
  @JoinTable()
  services: Service[];

  @ManyToOne(() => User, (user) => user.orders)
  customer: User;
}
