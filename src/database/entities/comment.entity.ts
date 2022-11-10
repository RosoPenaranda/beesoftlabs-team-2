import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ name: 'last_updated_at', type: 'timestamp' })
  last_updated_at: Date;

  @Column({ type: 'int' })
  points: number;

  @Column({ type: 'varchar', length: 500 })
  comment: string;

  @ManyToOne(() => User, (user) => user.comments)
  author: User;
}
