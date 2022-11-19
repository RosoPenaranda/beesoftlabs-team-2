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
import {
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { AuthRole } from 'src/auth/decorators/auth-role.decorator';
import { UserRole } from 'src/utils/enums';
import { ResponseCommentWithRelationsDto } from './dto/response-comment-with-relations.dto';
import { ResponseCommentWithoutRelationsDto } from './dto/response-comment-without-relations.dto';

@ApiTags('Comments')
@ApiBearerAuth('JWTAuth')
@Controller('comments')
@UseGuards(AuthGuard('JwtHeaderStrategy'))
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiResponse({
    type: ResponseCommentWithRelationsDto,
    description: 'Comment successfully created',
    status: 200,
  })
  @ApiInternalServerErrorResponse({ description: 'Error creating comment' })
  @ApiOperation({
    summary: 'Create a new comment',
  })
  @Post()
  createComment(@Body() commentDto: CreateCommentDto, @GetUser() author: User) {
    return this.commentService.create(commentDto, author);
  }

  @ApiOperation({
    summary: 'Find all stored comments',
  })
  @ApiResponse({
    type: [ResponseCommentWithoutRelationsDto],
    description: 'Array of comments',
    status: 200,
  })
  @ApiInternalServerErrorResponse({ description: 'Error finding comments' })
  @AuthRole(UserRole.ADMIN)
  @Get()
  getAllComments() {
    return this.commentService.findAll();
  }

  @ApiOperation({
    summary: 'Find a comment using its ID',
  })
  @ApiParam({ name: 'id', description: 'ID of the comment' })
  @ApiResponse({
    type: ResponseCommentWithRelationsDto,
    description: 'Returns the comment',
    status: 200,
  })
  @ApiInternalServerErrorResponse({ description: 'Error finding comment' })
  @ApiNotFoundResponse({ description: 'Comment not found' })
  @Get('/:id')
  getCommentById(@Param('id') id: string) {
    return this.commentService.findById(id);
  }

  @ApiOperation({
    summary: 'Find all comments using its author ID',
  })
  @ApiParam({ name: 'authorId', description: 'ID of the user' })
  @ApiResponse({
    type: [ResponseCommentWithoutRelationsDto],
    description:
      'Returns an array with the comments that were posted by the same user',
    status: 200,
  })
  @ApiInternalServerErrorResponse({ description: 'Error finding comments' })
  @Get('/authorId/:authorId')
  getCommentsByAuthorId(@Param('authorId') authorId: string) {
    return this.commentService.findByUserId(authorId);
  }

  @ApiOperation({
    summary: 'Find a comment using its ID and update its properties',
  })
  @ApiParam({ name: 'id', description: 'ID of the comment' })
  @ApiResponse({
    type: ResponseCommentWithoutRelationsDto,
    description: 'Returns the updated comment',
    status: 200,
  })
  @ApiInternalServerErrorResponse({ description: 'Error updating comment' })
  @ApiNotFoundResponse({ description: 'Comment not found' })
  @AuthRole(UserRole.ADMIN)
  @Patch('/:id')
  updateComment(
    @Body() newCommentDto: UpdateCommentDto,
    @Param('id') id: string,
  ) {
    return this.commentService.updateById(id, newCommentDto);
  }

  @ApiOperation({
    summary: 'Find a comment using its ID and deletes it',
  })
  @ApiParam({ name: 'id', description: 'ID of the comment' })
  @ApiResponse({
    type: ResponseCommentWithoutRelationsDto,
    description: 'Returns the removed comment',
    status: 200,
  })
  @ApiInternalServerErrorResponse({ description: 'Error deleting comment' })
  @ApiNotFoundResponse({ description: 'Comment not found' })
  @AuthRole(UserRole.ADMIN)
  @Delete('/:id')
  deleteCommentById(@Param('id') id: string) {
    return this.commentService.removeById(id);
  }
}
