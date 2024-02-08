import {
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/superadmin/users/users.service';

@Injectable()
export class AdminJwtStrategy extends PassportStrategy(Strategy, 'adminjwt') {
    constructor(private usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    async validate(payload: { userId: number }) {
        try {
            const user = await this.usersService.findOneAdmin(payload.userId);

            if (!user) {
                throw new UnauthorizedException();
            }

            if (user.role !== 'ADMIN') {
                throw new UnauthorizedException();
            }

            return user;
        } catch (error) {
            //console.log(error);
            throw new HttpException(
                'Internal Server Error',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
