import { Controller, Get, Param } from '@nestjs/common';
import { PostsService } from './provider/posts.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {

    constructor(
        private readonly postsService: PostsService
    ){}
    @Get()
    public getPosts(){
        return this.postsService.findAll('1');
    }
}
