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
  size: TypeOfService;

  @Column({ type: 'varchar', length: 250 })
  description: string;

  @Column({ type: 'varchar', length: 250 })
  price: string;

}
