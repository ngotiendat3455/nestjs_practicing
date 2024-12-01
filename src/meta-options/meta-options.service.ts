import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from './meta-option.entity';
import { Repository } from 'typeorm';
import { CreatePostMetaOptionsDto } from './dtos/create-post-meta-options.dto';

@Injectable()
export class MetaOptionsService {
    constructor(
        @InjectRepository(MetaOption)
        private metaOptionReponsitory: Repository<MetaOption>
    ){}

    public async create(createMetaDto: CreatePostMetaOptionsDto){
        let metaOption = this.metaOptionReponsitory.create({
            metaValue: JSON.parse(createMetaDto.metaValue)
        });
        console.log({
            metaOption,
            createMetaDto,
        })
        return await this.metaOptionReponsitory.save(metaOption);
    }
}
