import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { GoogleAuthGuard } from "./utils/guards";
import { Request } from "express";

@Controller('/auth')
export class AuthController {

  @Get('/google/login')
  @UseGuards(GoogleAuthGuard)
  handleLogin() {
    return {
      msg: 'Google auth'
    }
  }

  // api/auth/google/redirect
  @Get('/google/callback')
  @UseGuards(GoogleAuthGuard)
  handleRedirect() {
    return {
      msg: 'OK'
    }
  }

  @Get('/status')
  user(@Req() request: Request) {
    console.log('auth/status')
    console.log(request)
    console.log(request.user)
    if(request.user) {
      return { msg: 'Authenticated' };
    } else {
      { msg: 'Not Authenticated' };
    }
  }

}
