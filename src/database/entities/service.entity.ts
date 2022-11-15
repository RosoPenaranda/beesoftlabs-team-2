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
  name: string;

  @Column({ type: 'varchar', length: 500 })
  description: string;

  @Column({ type: 'float' })
  price: number;

  @Column({ type: 'text' })
  image_url: string;

  @Column({ type: 'varchar', length: 250 })
  image_alt: string;
}
