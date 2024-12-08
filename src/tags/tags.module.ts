import { Module } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { TagService } from './provider/tag.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './tag.entity';

@Module({
  controllers: [TagsController],
  providers: [TagService],
  exports: [TagService],
  imports: [
    TypeOrmModule.forFeature([Tag]),
  ]
})
export class TagsModule {}
