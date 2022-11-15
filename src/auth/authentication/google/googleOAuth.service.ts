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
    /* - search user in DB
        - if no user found then register it and return JWT
        - if user is found return JWT
    const user = req.user as GoogleUser;
    const userInDB = this.userService.findByEmail(user.email);
     */
    return {
      message: 'User information from google',
      user: req.user,
    };
  }
}
