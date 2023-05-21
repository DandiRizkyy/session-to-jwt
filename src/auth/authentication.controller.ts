import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateUser, LoginUser } from './dto/input-auth.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthenticatedGuard } from './authenticated.guard';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from 'src/user/entities/user.entity';

@Controller('auth')
@ApiTags('auth')
export class AuthenticationController {
    constructor(private authService: AuthenticationService){}

    // register user
    @Post('register')
    @ApiCreatedResponse({status: 201, description: 'Successfully Registered'})
    async registerUser(@Body() authDto: CreateUser){
        return await this.authService.registerUser(authDto);
    }

    // login
    @UseGuards(LocalAuthGuard)
    @Post('login')
    @ApiCreatedResponse({status: 201, description: 'Login Successfully'})
    async loginUser(@Body() authDto: LoginUser){
        console.log(`${authDto.email} is logging in`)
        return `Login Successfully.`
    }

    // logout
    @UseGuards(AuthenticatedGuard)
    @Post('logout')
    @ApiCreatedResponse({status: 201, description: 'Logout Successfully'})
    logoutUser(@Request() req){
        req.session.destroy();
        return `Logout Successfully.`
    }
}
