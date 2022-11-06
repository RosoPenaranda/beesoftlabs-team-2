import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TypeOfService } from './enums';

@Entity('services')
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: TypeOfService,
  })
  size: TypeOfService;

  @Column({ type: 'varchar', length: 250 })
  description: string;

  @Column({ type: 'varchar', length: 250 })
  price: string;

  @Column({ type: 'date', nullable: true })
  start_time: Date | null;

  @Column({ type: 'date', nullable: true })
  end_time: Date | null;
}
