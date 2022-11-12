import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/createComment.dto';
import { Comment } from '../../database/entities/comment.entity';
import { User } from '../../database/entities/user.entity';
import { UpdateCommentDto } from './dto/updateComment.dto';

@Injectable()
export class CommentService {
  private readonly logger = new Logger('CommentService');

  constructor(
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>,
  ) {}

  async create(commentDto: CreateCommentDto, author: User) {
    try {
      const newComment = await this.commentRepo.create(commentDto);
      newComment.author = author;
      return await this.commentRepo.save(commentDto);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Error creating comment');
    }
  }

  async findAll() {
    try {
      const comments = await this.commentRepo.find();
      if (!comments || comments.length === 0) {
        throw new NotFoundException('Comments not found or empty');
      }
      return comments;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Error finding comments');
    }
  }

  async findById(id: string) {
    try {
      const comment = await this.commentRepo.findOne({
        relations: ['author'],
        where: { id: id },
      });
      if (!comment) {
        throw new NotFoundException('Comment not found');
      }
      return comment;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Error finding comment');
    }
  }

  async updateById(id: string, newComment: UpdateCommentDto) {
    try {
      const oldComment = await this.commentRepo.findOne({ where: { id } });
      if (!oldComment) {
        throw new NotFoundException('Comment not found');
      }
      const updateComment = {
        ...oldComment,
        ...newComment,
      };
      return await this.commentRepo.save(updateComment);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Error updating comment');
    }
  }

  async removeById(id: string) {
    try {
      const deleteComment = await this.commentRepo.findOne({ where: { id } });
      if (!deleteComment) {
        throw new NotFoundException('Comment not found');
      }
      await this.commentRepo.delete({ id: id });
      return deleteComment;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Error deleting comment');
    }
  }
}
