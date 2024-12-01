import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagsModule } from './tags/tags.module';
import { MetaOptionsModule } from './meta-options/meta-options.module';

@Module({
  imports: [
    UsersModule, 
    PostsModule, 
    AuthModule,
    TypeOrmModule.forRootAsync({
      imports: [],
      inject: [],
      useFactory: () => ({
        type: 'postgres',
        // entities: [],
        synchronize: true,
        autoLoadEntities: true,
        port: 5432,
        username: 'user',
        password: '123456',
        host: '127.0.0.1',
        database: 'nestjs-blog',
      }),
    }),
    TagsModule,
    MetaOptionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
