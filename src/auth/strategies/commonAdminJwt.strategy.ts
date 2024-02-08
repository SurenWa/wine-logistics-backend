//src/auth/jwt.strategy.ts
import {
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/superadmin/users/users.service';
import { AdminJwtStrategy } from './adminJwt.strategy';

@Injectable()
export class CommonAdminJwtStrategy extends PassportStrategy(
    Strategy,
    'commonadminjwt',
) {
    constructor(
        private usersService: UsersService,
        private readonly adminJwtStrategy: AdminJwtStrategy,
    ) {
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

            //throw new UnauthorizedException('Unauthorized');

            if (user.role !== 'SUPERADMIN') {
                try {
                    return await this.adminJwtStrategy.validate(payload);
                } catch (error) {
                    throw new UnauthorizedException('Unauthorized');
                }
            }

            return user;
        } catch (error) {
            throw new HttpException(
                'Internal Server Error',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
