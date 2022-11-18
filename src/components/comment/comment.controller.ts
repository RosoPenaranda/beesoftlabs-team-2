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
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { AuthRole } from 'src/auth/decorators/auth-role.decorator';
import { UserRole } from 'src/utils/enums';

@ApiTags('Comments')
@ApiBearerAuth('JWTAuth')
@Controller('comments')
@UseGuards(AuthGuard('JwtHeaderStrategy'))
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  createComment(@Body() commentDto: CreateCommentDto, @GetUser() author: User) {
    return this.commentService.create(commentDto, author);
  }

  @AuthRole(UserRole.ADMIN)
  @Get()
  getAllComments() {
    return this.commentService.findAll();
  }

  @Get('/:id')
  getCommentById(@Param('id') id: string) {
    return this.commentService.findById(id);
  }

  @Get('/authorId/:authorId')
  getCommentsByAuthorId(@Param('authorId') authorId: string) {
    return this.commentService.findByUserId(authorId);
  }

  @AuthRole(UserRole.ADMIN)
  @Patch('/:id')
  updateComment(
    @Body() newCommentDto: UpdateCommentDto,
    @Param('id') id: string,
  ) {
    return this.commentService.updateById(id, newCommentDto);
  }

  @AuthRole(UserRole.ADMIN)
  @Delete('/:id')
  deleteCommentById(@Param('id') id: string) {
    return this.commentService.removeById(id);
  }
}
