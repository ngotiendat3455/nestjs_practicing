import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { GetUserParamDto } from '../dtos/getUserParamDto.dto';
import { AuthService } from 'src/auth/provider/auth.service';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
@Injectable()
export class UsersService {
    constructor(
        @Inject(forwardRef(() => AuthService))
        private readonly authService: AuthService,
        @InjectRepository(User)
        private readonly userReponsitory: Repository<User>
      ) {
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

    public async findOneById(id: number) {
      return await this.userReponsitory.findOneBy({
        id: id
      });
    }

    public async createUser(createUser: CreateUserDto) {
      // check if user with email exists
      const existUser = await this.userReponsitory.findOne({
        where: {
          email: createUser.email
        }
      })
      /**
       * handle exception
       */
      let newUser = this.userReponsitory.create(createUser);
      newUser = await this.userReponsitory.save(newUser);

      return newUser;
    }

}
