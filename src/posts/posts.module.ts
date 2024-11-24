import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './provider/posts.service';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    controllers: [PostsController],
    providers: [PostsService],
    imports: [UsersModule, AuthModule]
})
export class PostsModule {}
