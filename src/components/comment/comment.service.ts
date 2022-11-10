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
import { UpdateCommentDto } from "./dto/updateComment.dto";

@Injectable()
export class CommentService {
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
      throw new InternalServerErrorException(error, 'Error creating comment');
    }
  }

  async findAll() {
    try {
      return await this.commentRepo.find();
    } catch (error) {
      this.logger.error(error);
      throw new NotFoundException('Comment not found');
    }
  }

  async findById(id: string) {
    try {
      return await this.commentRepo.findOne({ where: { id } });
    } catch (error) {
      this.logger.error(error);
      throw new NotFoundException('Comment not found');
    }
  }

  async updateById(id: string, newComment: Partial<UpdateCommentDto>) {
    try {
      const oldComment = await this.commentRepo.findOne({ where: { id } });
      if (!oldComment) {
        this.logger.error('Comment not found, verify the information');
        throw new NotFoundException('Comment not found');
      }
      let updateComment = {
        ...oldComment,
        ...newComment,
      };
      return await this.commentRepo.save(updateComment);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error, 'Error updating comment');
    }
  }

  async removeById(id: string) {
    try {
      const deleteComment = await this.commentRepo.findOne({ where: { id } });
      if (!deleteComment) {
        this.logger.error('Comment not found');
        throw new NotFoundException('Comment not found');
      }
      await this.commentRepo.delete(id);
      return deleteComment;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error, 'Error deleting comment');
    }
  }
}
