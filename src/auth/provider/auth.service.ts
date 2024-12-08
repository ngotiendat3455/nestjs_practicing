import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/provider/users.service';

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UsersService))
        private readonly usersService: UsersService
    ){}

    public login(email: string, password: string) {
        // const user = this.usersService.findOneById('1234');
        return 'token';
    }

    public isAuth(){
        return true;
    }
}
