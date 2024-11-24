import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { GetUserParamDto } from '../dtos/getUserParamDto.dto';
import { AuthService } from 'src/auth/provider/auth.service';
@Injectable()
export class UsersService {
    constructor(
      @Inject(forwardRef(() => AuthService))
      private readonly authService: AuthService) {
    }
    
    public findAll(
        getUserParamDto: GetUserParamDto,
        limt: number,
        page: number,
    ) {
      const isAuth = this.authService.isAuth();
      console.log(isAuth);
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
