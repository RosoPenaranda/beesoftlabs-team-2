import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { UpdateCommentDto } from './dto/updateComment.dto';
import { CreateCommentDto } from './dto/createComment.dto';
import { Comment } from '../../database/entities/comment.entity';
import { User } from '../../database/entities/user.entity';
import { CRUD } from '../../utils/CRUD.interface';

@Injectable()
export class CommentService implements CRUD<Comment> {
  private readonly logger = new Logger('CommentService');

  constructor(
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>,
  ) {}

  async create(commentDto: CreateCommentDto, user: User) {
    try {
      const newComment = await this.commentRepo.create(commentDto);
      newComment.author = user;

      return await this.commentRepo.save(commentDto);
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        'Error creating the comment',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  async findAll() {
    try {
      return await this.commentRepo.find();
    } catch (error) {
      this.logger.error(error);
      throw new HttpException('Comment not found', HttpStatus.NOT_FOUND);
    }
  }

  async findById(id: string) {
    try {
      return await this.commentRepo.findOne({ where: { id } });
    } catch (error) {
      this.logger.error(error);
      throw new HttpException('Comment not found', HttpStatus.NOT_FOUND);
    }
  }

  async updateById(id: string, newComment: Partial<UpdateCommentDto>) {
    try {
      const oldComment = await this.commentRepo.findOne({ where: { id } });
      if (!oldComment) {
        this.logger.error('Comment not found, verify the information');
        throw new HttpException(
          'Comment cant be updated',
          HttpStatus.BAD_GATEWAY,
        );
      }
      const commentDto = Object.assign(oldComment, newComment);
      return await this.commentRepo.save(commentDto);
    } catch (error) {
      this.logger.error(error);
      throw new HttpException('Comment not found', HttpStatus.NOT_FOUND);
    }
  }

  async removeById(id: string) {
    try {
      const deleteComment = await this.commentRepo.findOne({ where: { id } });
      if (!deleteComment) {
        this.logger.error('Comment not found, verify the information');
        throw new HttpException('Remove failed', HttpStatus.NOT_FOUND);
      }
      await this.commentRepo.delete(id);
      return deleteComment;
    } catch (error) {
      this.logger.error(error);
      throw new HttpException('Remove failed', HttpStatus.NOT_FOUND);
    }
  }
}
