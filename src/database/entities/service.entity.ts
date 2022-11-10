import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TypeOfService } from '../../utils/enums';

@Entity('services')
export class Service {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: TypeOfService,
  })
  service: TypeOfService;

  @Column({ type: 'varchar', length: 250 })
  description: string;

  @Column({ type: 'float' })
  price: number;
}
