import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from 'src/components/user/user.service';

@Injectable()
export class GoogleOAuthService {
  constructor(private readonly userService: UserService) {}
  googleLogin(req: Request) {
    if (!req.user) {
      return 'No user from google';
    }
    return {
      message: 'User information from google',
      user: req.user,
    };
  }
}
