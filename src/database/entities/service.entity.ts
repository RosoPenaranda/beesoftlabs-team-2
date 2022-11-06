import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('services')
export class services {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;
}
