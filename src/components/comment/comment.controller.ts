import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Controller,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/createComment.dto';
import { User } from '../../database/entities/user.entity';
import { UpdateCommentDto } from './dto/updateComment.dto';

@Controller('comments')
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
    @Body() newCommentDto: Partial<UpdateCommentDto>,
    @Param('id') id: string,
  ) {
    return this.commentService.updateById(id, newCommentDto);
  }

  @Delete('/:id')
  deleteCommentById(@Param('id') id: string) {
    return this.commentService.removeById(id);
  }
}
