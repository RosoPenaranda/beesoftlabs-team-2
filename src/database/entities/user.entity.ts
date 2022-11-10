import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Address } from './address.entity';
import { Comment } from './comment.entity';
import { UserRole } from '../../utils/enums';
import { Order } from './order.entity';
import { Pet } from './pet.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @PrimaryColumn({ type: 'varchar', length: 250 })
  email: string;

  @Column({ type: 'varchar', length: 250 })
  name: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  created_at: Date;

  @Column({ type: 'text' })
  profile_picture: string;

  @Column({ type: 'int', nullable: true })
  phone: number;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CLIENT,
  })
  roles: UserRole;

  @OneToMany(() => Pet, (pet) => pet.owner)
  pets: Pet[];

  @OneToMany(() => Address, (address) => address.owner)
  addresses: Address[];

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];

  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Comment[];
}
