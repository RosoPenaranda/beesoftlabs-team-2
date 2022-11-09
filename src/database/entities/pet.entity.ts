import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PetSize } from '../../utils/enums';
import { User } from './user.entity';

@Entity({ name: 'pets' })
export class Pet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 250 })
  name: string;

  @Column({ type: 'varchar', length: 250 })
  species: string;

  @Column({ type: 'text' })
  profile_picture: string;

  @Column({ type: 'float' })
  weight: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @Column({
    type: 'enum',
    enum: PetSize,
    default: PetSize.NORMAL,
  })
  size: PetSize;

  @ManyToOne(() => User, (user) => user.pets)
  owner: User;
}
