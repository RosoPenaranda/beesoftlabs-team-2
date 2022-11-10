import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmConfigModule } from "../../config/typeorm/typeorm.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../../database/entities/user.entity";
import { GoogleStrategy } from "../../auth/utils/google.strategy";
import { SessionSerializer } from "../../auth/utils/serializer";
import { AuthService } from "../../auth/auth.service";

@Module({
  imports: [
    TypeOrmConfigModule,
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    GoogleStrategy,
    SessionSerializer,
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    }
  ],
  exports: [UserService],
})
export class UserModule {}
