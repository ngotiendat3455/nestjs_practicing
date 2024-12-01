import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PostsService } from './provider/posts.service';
import { ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dto';

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

    @Post()
    public createPost(@Body() createPostDto: CreatePostDto){
        return this.postsService.create(createPostDto);
    }
}
