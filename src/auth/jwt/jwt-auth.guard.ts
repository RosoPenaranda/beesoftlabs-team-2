import {  Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http-header-strategy';

import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard extends PassportStrategy(
    Strategy,
    'JwtHeaderStrategy'
) {
    constructor(
        private readonly jwtService: JwtService
    ) {
        super()
    }

    validate(data: string) {
        if(!data) {
            console.log('No hay data', data)
            return null
        }

        try {
            console.log('Guard', this.jwtService.decode(data))
            return this.jwtService.decode(data)

        } catch (e) {
            console.log(e)
            return e
        }

    }


}
