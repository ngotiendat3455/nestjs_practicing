import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('users')
export class UsersController {
    @Get()
    public getUsers(){
        return "You sent a get request to users endpoint";
    }

    @Post()
    public createUsers(@Body(new ValidationPipe()) createUserDto: CreateUserDto){
        console.log(createUserDto);
        return "You sent a post request to users endpoint";
    }
}
