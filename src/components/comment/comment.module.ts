import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { TypeOrmConfigModule } from '../../config/typeorm/typeorm.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfigModule } from '../../config/database/config.module';
import { AppConfigModule } from '../../config/app/config.module';
import { Comment } from '../../database/entities/comment.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmConfigModule,
    TypeOrmModule.forFeature([Comment]),
    DatabaseConfigModule,
    AppConfigModule,
  ],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
