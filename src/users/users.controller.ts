import { Body, Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Post, Query, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './provider/users.service';
import { GetUserParamDto } from './dtos/getUserParamDto.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {

    constructor(
        // Injecting Users Service
        private readonly usersService: UsersService,
      ) {}

    @Get('/:id?')
    public getUsers(
        @Param() getUserParamDto: GetUserParamDto,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    ){
        return this.usersService.findAll(getUserParamDto, limit, page);
    }

    @Post()
    public createUsers(@Body() createUserDto: CreateUserDto){
        console.log(createUserDto);
        return "You sent a post request to users endpoint";
    }
}
