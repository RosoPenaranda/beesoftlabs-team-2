import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfigModule } from 'src/config/database/config.module';
import { AppConfigModule } from 'src/config/app/config.module';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmConfigModule } from '../../config/typeorm/typeorm.module';
import { User } from '../../database/entities/user.entity';
import { GoogleOAuthConfigModule } from 'src/config/googleOAuth/config.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmConfigModule,
    TypeOrmModule.forFeature([User]),
    GoogleOAuthConfigModule,
    AuthModule,
  ],
  controllers: [UserController],
  providers: [DatabaseConfigModule, AppConfigModule, UserService],
  exports: [UserService],
})
export class UserModule {}
