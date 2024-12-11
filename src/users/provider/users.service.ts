import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { GetUserParamDto } from '../dtos/getUserParamDto.dto';
import { AuthService } from 'src/auth/provider/auth.service';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { ConfigService, ConfigType } from '@nestjs/config';
import profileConfig from 'src/config/profile.config';
@Injectable()
export class UsersService {
    constructor(
        @Inject(forwardRef(() => AuthService))
        private readonly authService: AuthService,
        @InjectRepository(User)
        private readonly userReponsitory: Repository<User>,
        // Injecting ConfigService
        private readonly configService: ConfigService,
        @Inject(profileConfig.KEY)
        private readonly profileConfiguration: ConfigType<typeof profileConfig>,
      ) {
    }
    
    public findAll(
        getUserParamDto: GetUserParamDto,
        limt: number,
        page: number,
    ) {
      const isAuth = this.authService.isAuth();
      console.log(isAuth);
      // get an environment variable
    const environment = this.configService.get<string>('S3_BUCKET');
    console.log(environment);
    console.log(this.profileConfiguration.apiKey);
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
