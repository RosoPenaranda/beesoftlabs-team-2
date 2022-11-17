import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { TypeOrmConfigModule } from 'src/config/typeorm/typeorm.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from 'src/database/entities/service.entity';
import { DatabaseConfigModule } from 'src/config/database/config.module';
import { AppConfigModule } from 'src/config/app/config.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmConfigModule,
    TypeOrmModule.forFeature([Service]),
    DatabaseConfigModule,
    AppConfigModule,
  ],
  controllers: [ServiceController],
  providers: [ServiceService],
  exports: [ServiceService],
})
export class ServiceModule {}
