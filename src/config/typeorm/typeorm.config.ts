import * as dotenv from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

dotenv.config({ path: '.env' });

const config: TypeOrmModuleOptions = {
  name: 'default',
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: false,
  entities: [__dirname + './../../**/*.entity{.ts,.js}'],
  migrations: ['src/database/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
};

export default config;
