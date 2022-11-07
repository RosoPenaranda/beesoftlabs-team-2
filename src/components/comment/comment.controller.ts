import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CommentService } from "./comment.service";
import { CreateCommentDto } from "./dto/createComment.dto";
import { UpdateCommentDto } from "./dto/updateComment.dto";
import { User } from "../../database/entities/user.entity";

@Controller('comments')
export class CommentController {

  constructor(
    private readonly commentService: CommentService
  ) {
  }

  @Post()
  createComment(@Body()commentDto: CreateCommentDto, user: User) {
    return this.commentService.createComment(commentDto, user);
  }

  @Get()
  getAllComments() {
    return this.commentService.getAllComments();
  }

  @Get(':id')
  getCommentById(@Param('id') id: string) {
    return this.commentService.getCommentById(id);
  }

  @Patch(':id')
  updateComment(
    @Body() newCommentDto: UpdateCommentDto,
    @Param('id') id: string
  ) {
    return this.commentService.updateComment(newCommentDto, id);
  }

  @Delete(':id')
  deleteCommentById(@Param('id') id: string) {
    return this.commentService.deleteCommentById(id);
  }

}
