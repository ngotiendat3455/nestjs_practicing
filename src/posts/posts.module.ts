import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './provider/posts.service';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { Post } from './post.entity';

@Module({
    controllers: [PostsController],
    providers: [PostsService],
    imports: [
        UsersModule, 
        AuthModule, 
        TypeOrmModule.forFeature([Post, MetaOption]),
    ]
})
export class PostsModule {}
