import { Body, Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './provider/users.service';
import { GetUserParamDto } from './dtos/getUserParamDto.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PatchUserDto } from './dtos/patch-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {

    constructor(
        // Injecting Users Service
        private readonly usersService: UsersService,
      ) {}

    @ApiOperation({
        summary: 'Fetches a list of registered users on the application.'
      })
    @ApiQuery({
        name: 'limit',
        type: String,
        description: 'The upper limit of pages you want the pagination to return',
        required: false,
      })
    @ApiQuery({
        name: 'page',
        type: String,
        description:
          'The position of the page number that you want the API to return',
        required: false,
      })
    @ApiResponse({
        status: 200,
        description: 'Users fetched successfully based on the query',
      })
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
        return this.usersService.createUser(createUserDto);
    }

    @Patch()
    public patchUser(@Body() patchUserDto: PatchUserDto) {
      return patchUserDto;
    }
}
