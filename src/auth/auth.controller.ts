import { Body, Controller, Post, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOkResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthEntity } from './entity/auth.entity';
import { LoginDto } from './dto/login.dto';
import { UserEntity } from 'src/superadmin/users/entities/user.entity';
import { GetCurrentUserId } from 'src/common/decorators/get-current-user.decorator';
import { UsersService } from 'src/superadmin/users/users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService,
    ) {}

    @Post('login')
    @ApiOkResponse({ type: AuthEntity })
    login(@Body() { email, password }: LoginDto) {
        return this.authService.login(email, password);
    }

    @Get('/current-user')
    @UseGuards(AuthGuard(['commonadminjwt', 'adminjwt']))
    @ApiBearerAuth()
    @ApiOkResponse({ type: UserEntity })
    async getUserProfile(
        @GetCurrentUserId() userId: number,
    ): Promise<UserEntity> {
        return this.usersService.findOneAdmin(userId);
    }
}
