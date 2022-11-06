import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PetSize } from './enums';
import { User } from './user.entity';

@Entity({ name: 'pets' })
export class Pet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 250 })
  name: string;

  @Column({ type: 'varchar', length: 250 })
  species: string;

  @Column({ type: 'varchar', length: 250 })
  profile_picture: string;

  @Column({ type: 'int' })
  weight: string;

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
