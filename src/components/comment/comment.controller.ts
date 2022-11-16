import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Controller,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/createComment.dto';
import { User } from '../../database/entities/user.entity';
import { UpdateCommentDto } from './dto/updateComment.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';

@ApiTags('Comments')
@ApiBearerAuth('JWTAuth')
@Controller('comments')
@UseGuards(JwtAuthGuard)
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  createComment(@Body() commentDto: CreateCommentDto, user: User) {
    return this.commentService.create(commentDto, user);
  }

  @Get()
  getAllComments() {
    return this.commentService.findAll();
  }

  @Get('/:id')
  getCommentById(@Param('id') id: string) {
    return this.commentService.findById(id);
  }

  @Patch('/:id')
  updateComment(
    @Body() newCommentDto: UpdateCommentDto,
    @Param('id') id: string,
  ) {
    return this.commentService.updateById(id, newCommentDto);
  }

  @Delete('/:id')
  deleteCommentById(@Param('id') id: string) {
    return this.commentService.removeById(id);
  }
}
