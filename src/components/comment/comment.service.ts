import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Comment } from '../../database/entities/comment.entity';
import { UpdateCommentDto } from './dto/updateComment.dto';
import { CreateCommentDto } from './dto/createComment.dto';
/*import { User } from "../../database/entities/user.entity";*/

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>,
  ) {}

  async createComment(commentDto: CreateCommentDto, /*user: User*/) {
    try {
      const newComment = await this.commentRepo.create(commentDto);
      /*newComment.author = user;*/

      return await this.commentRepo.save(commentDto);
    } catch (e) {
      throw new HttpException(
        'Error creating the comment',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

   async getAllComments() {
     try {
       return await this.commentRepo.find();
     } catch (e) {
       throw new HttpException('Comment not found', HttpStatus.NOT_FOUND);
     }
   }

  async getCommentById(id: string) {
    try {
      return await this.commentRepo.findOne({ where: { id } });
    } catch (e) {
      throw new HttpException('Comment not found', HttpStatus.NOT_FOUND);
    }
  }

  async updateComment(newComment: UpdateCommentDto, id: string) {
    try {
      const oldComment = await this.commentRepo.findOne({ where: { id } });

      if (!oldComment) {
        return new HttpException(
          'Comment cant be updated',
          HttpStatus.BAD_GATEWAY,
        );
      }

      const commentDto = Object.assign(oldComment, newComment);

      return await this.commentRepo.save(commentDto);
    } catch (e) {
      throw new HttpException('Comment not found', HttpStatus.NOT_FOUND);
    }
  }

  async deleteCommentById(id: string) {
    const deleteComment = await this.commentRepo.findOne({ where: { id } });

    if (!deleteComment)
      return new HttpException('Remove failed', HttpStatus.NOT_FOUND);

    await this.commentRepo.delete(id);

    return deleteComment;
  }
}
