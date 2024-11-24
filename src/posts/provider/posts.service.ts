import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/provider/users.service';

@Injectable()
export class PostsService {
    constructor(
        private readonly usersService: UsersService
    ){}

    public findAll(userId: string) {
        const user = this.usersService.findOneById(userId);
        return [
            {
              user: user,
              title: 'Test Tile',
              content: 'Test Content',
            },
            {
              user: user,
              title: 'Test Tile 2',
              content: 'Test Content 2',
            },
          ];
    }
}
