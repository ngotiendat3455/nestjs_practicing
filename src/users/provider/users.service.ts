import { Injectable } from '@nestjs/common';
import { GetUserParamDto } from '../dtos/getUserParamDto.dto';
@Injectable()
export class UsersService {
    public findAll(
        getUserParamDto: GetUserParamDto,
        limt: number,
        page: number,
    ) {
        return [
            {
              firstName: 'John',
              email: 'john@doe.com',
            },
            {
              firstName: 'Alice',
              email: 'alice@doe.com',
            },
          ];
    }

    public findOneById(id: string) {
      return {
        id: 1234,
        firstName: 'Alice',
        email: 'alice@doe.com',
      };
    }
}
