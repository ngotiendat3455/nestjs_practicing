import { Body, Controller, Delete, ParseIntPipe, Post, Query } from '@nestjs/common';
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

    @Delete()
    public delete(@Query('id', ParseIntPipe) id: number) {
        return this.tagService.delete(id);
    }

    @Delete('soft-delete')
    public softDelete(@Query('id', ParseIntPipe) id: number){
        return this.tagService.softRemove(id);
    }
}
