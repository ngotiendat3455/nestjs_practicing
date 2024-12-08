import { Body, Controller, Post } from '@nestjs/common';
import { TagService } from './provider/tag.service';
import { CreateTagDto } from './dto/create-tag.dto';

@Controller('tags')
export class TagsController {
    constructor(
        private readonly tagService: TagService
    ){}

    @Post()
    public create(@Body() createTagDto: CreateTagDto){
        return this.tagService.create(createTagDto);
    }
}
