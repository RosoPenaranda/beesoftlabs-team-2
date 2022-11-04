import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from '../../config/app/config.module';
import { DatabaseConfigModule } from '../../config/database/config.module';
import { TypeOrmConfigModule } from '../../config/typeorm/typeorm.module';
import { User } from '../../database/entities/user.entity';
import { DemoAppController } from './demo-app.controller';
import { DemoAppService } from './demo-app.service';

@Module({
  imports: [
    TypeOrmConfigModule,
    TypeOrmModule.forFeature([User]),
    DatabaseConfigModule,
    AppConfigModule,
  ],
  controllers: [DemoAppController],
  providers: [DemoAppService],
})
export class DemoModule {}
