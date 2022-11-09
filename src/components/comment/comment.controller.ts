import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/createComment.dto';
import { UpdateCommentDto } from './dto/updateComment.dto';
import { User } from '../../database/entities/user.entity';

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

  @Put('/:id')
  putAddress(
    @Body() newComment: Required<UpdateCommentDto>,
    @Param('id') id: string,
  ) {
    return this.commentService.updateById(id, newComment);
  }

  @Delete('/:id')
  deleteCommentById(@Param('id') id: string) {
    return this.commentService.removeById(id);
  }
}
