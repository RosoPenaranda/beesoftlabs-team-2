import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {

    console.log(ctx.switchToHttp().getRequest().headers)
    const req = ctx.switchToHttp().getRequest().headers
    /* console.log('token', req) */
    const user = req.user;

    if (!user) throw new UnauthorizedException('User not found in request');

    return data ? user?.[data] : user;
  },
);
