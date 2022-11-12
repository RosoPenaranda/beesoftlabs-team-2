import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfigModule } from 'src/config/database/config.module';
import { AppConfigModule } from 'src/config/app/config.module';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmConfigModule } from '../../config/typeorm/typeorm.module';
import { User } from '../../database/entities/user.entity';
import { GoogleStrategy } from '../../auth/utils/google.strategy';
import { SessionSerializer } from '../../auth/utils/serializer';
import { AuthService } from '../../auth/auth.service';

@Module({
  imports: [TypeOrmConfigModule, TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    DatabaseConfigModule,
    AppConfigModule,
    UserService,
    GoogleStrategy,
    SessionSerializer,
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    },
  ],
  exports: [UserService],
})
export class UserModule {}
