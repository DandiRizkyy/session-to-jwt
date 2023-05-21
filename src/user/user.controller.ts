import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';

@Controller('users')
@ApiTags('users')
export class UserController {
    constructor(private userService: UserService){}

    @ApiOkResponse({type: UserEntity, isArray: true})
    @ApiBearerAuth()
    @Get()
    async getAllUsers(){
        return await this.userService.getAllUsers();
    }
}
