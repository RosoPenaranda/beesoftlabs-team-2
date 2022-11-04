import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DemoModule } from './components/demo/app.module';
import { AppConfigModule } from './config/app/config.module';
import { DatabaseConfigModule } from './config/database/config.module';
import { TypeOrmConfigModule } from './config/typeorm/typeorm.module';
import { User } from './database/entities/user.entity';

@Module({
  imports: [
    TypeOrmConfigModule,
    TypeOrmModule.forFeature([User]),
    DatabaseConfigModule,
    AppConfigModule,
    DemoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
