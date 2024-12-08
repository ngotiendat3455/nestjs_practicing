import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/provider/users.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../post.entity';
import { Repository } from 'typeorm';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { PatchPostDto } from '../dto/patch-post.dto';
import { TagService } from 'src/tags/provider/tag.service';

@Injectable()
export class PostsService {
    constructor(
        private readonly usersService: UsersService,
        @InjectRepository(Post)
        private readonly postReponsitory: Repository<Post>,
        @InjectRepository(MetaOption)
        private readonly metaOptionReponsitory: Repository<MetaOption>,
        private readonly tagService: TagService
    ){}

    public async findAll(userId: string) {
        const user = this.usersService.findOneById(Number(userId));
        let posts = await this.postReponsitory.find({
          relations: {
            metaOptions: true,
            author: true,
          }
        })
        return posts;
    }

    public async deletePost(id: number) {
      // const found = await this.postReponsitory.findOneBy({
      //   id: id
      // });
      // await this.postReponsitory.delete(id);
      // await this.metaOptionReponsitory.delete(found.metaOptions.id);
      await this.postReponsitory.delete(id);
      return {
        deleted: true,
        id: id
      }
    }
    public async create(createPostDto: CreatePostDto) {
      // Create the metaOptions first if they exist
      // let metaOptions = createPostDto.metaOptions ? this.metaOptionReponsitory.create(createPostDto.metaOptions) : null;

      // if (metaOptions) {
      //   await this.metaOptionReponsitory.save(metaOptions);
      // }
      let author = await this.usersService.findOneById(createPostDto.authorId);
      let tags = await this.tagService.findMultipleTags(createPostDto.tags);
      // create the post
      let post = this.postReponsitory.create({
        ...createPostDto,
        author,
        tags
      });
      // if (metaOptions) {
      //   post.metaOptions = metaOptions;
      // }
      return await this.postReponsitory.save(post);
    }

    public async update(patchPostDto: PatchPostDto) {
      console.log(patchPostDto);
      let tags = await this.tagService.findMultipleTags(patchPostDto.tags);
      let post = await this.postReponsitory.findOneBy({
        id: patchPostDto.id
      })
      post.tags = tags;
      post.title = patchPostDto.title;
      post.content = patchPostDto.content;
      post.status = patchPostDto.status;
      return await this.postReponsitory.save({...post})
    }
}
