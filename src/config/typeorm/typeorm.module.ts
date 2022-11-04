import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DatabaseConfigModule } from '../database/config.module';
import { DatabaseConfigService } from '../database/config.service';

export const getTypeOrmModuleOptions = (
  config: DatabaseConfigService,
): TypeOrmModuleOptions =>
  ({
    type: 'postgres',
    host: config.host,
    port: config.port,
    username: config.username,
    password: config.password,
    database: config.database,
    entities: [__dirname + './../../**/*.entity{.ts,.js}'],
    synchronize: false,
    logging: config.logging,
    logger: config.logger,
    autoLoadEntities: true,
  } as TypeOrmModuleOptions);

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [DatabaseConfigModule],
      inject: [DatabaseConfigService],
      useFactory: getTypeOrmModuleOptions,
    }),
  ],
})
export class TypeOrmConfigModule {}
