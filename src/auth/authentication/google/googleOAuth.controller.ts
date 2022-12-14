import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { GoogleOAuthService } from './googleOAuth.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { ApiExcludeEndpoint, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('GoogleOAuth')
@Controller('/auth/google/')
export class GoogleOAuthController {
  constructor(private readonly googleOAuthService: GoogleOAuthService) {}

  @ApiOperation({
    summary: 'Redirects to google log in page',
  })
  @Get('/login')
  @UseGuards(AuthGuard('google'))
  async googleLogIn(@Req() req: Request) {
    return { msg: 'logging with google', req: req };
  }

  @ApiExcludeEndpoint()
  @Get('/redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req: Request) {
    return this.googleOAuthService.googleLogin(req);
  }
}
