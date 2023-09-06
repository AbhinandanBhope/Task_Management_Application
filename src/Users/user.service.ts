import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entites/user.entity';
import { sign } from 'jsonwebtoken';
import { error } from 'console';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async createUser(body): Promise<User> {
    try {
      body['isDeleted'] = null;
      const addUser = await this.usersRepository.save(body);
      return addUser;
    } catch (err) {
      return err;
    }
  }
  async getUserById(Id) {
    const user = await this.usersRepository.findOneBy({
      id: parseInt(Id),
    });
   

    return user;
  }

  async loginUser(body2) {
    const user = await this.usersRepository.findOneBy({
      email: body2.email,
    });
    if (!user) {
      return { status: false, msg: 'user not found', status_code: 404 };
    }

    if (user.password != body2.password) {
      return { status: false, msg: 'invalid password', status_code: 409 };
    }
  
    const TOKEN = await sign(
      { email: user.email, id: user.id },
      process.env.TOKEN_KEY,
    );
    console.log(TOKEN);
    return {
      status: true,
      token: TOKEN,
    };
  }
  async updateUser(body3, Id) {
    console.log(body3);
    console.log(Id);
    let user = await this.getUserById(Id.id);
    user.first_name =body3.first_name;
    user.last_name =body3.last_name;
    await this.usersRepository.save(user)
    console.log(user);

  }
  
}
