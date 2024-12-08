import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { PostsService } from './provider/posts.service';
import { ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dto';
import { PatchPostDto } from './dto/patch-post.dto';

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

    @Patch()
    public patchPost(@Body() patchPostDto: PatchPostDto) {
        return this.postsService.update(patchPostDto);        
    }

    @Delete()
    public deletePost(@Query("id", ParseIntPipe) id: number){
        return this.postsService.deletePost(id);
    }
}
