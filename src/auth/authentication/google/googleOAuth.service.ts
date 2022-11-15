import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from 'src/components/user/user.service';
// import { UGoogleUser } from 'src/utils/types';

@Injectable()
export class GoogleOAuthService {
  constructor(private readonly userService: UserService) {}
  googleLogin(req: Request) {
    if (!req.user) {
      return { msj: 'No user from google' };
    }

    return {
      message: 'User information from google',
      user: req.user,
    };
  }
}
