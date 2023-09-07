import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entites/user.entity';
import { sign } from 'jsonwebtoken';
import { error } from 'console';
import { Exclude } from 'class-transformer';
import { Md5 } from 'ts-md5';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async createUser(body){
    try {
      const user = await this.usersRepository.findOneBy({
        email: body.email,
      });
      if(user){
        return { status: false, msg: 'email is already register', status_code: 404 };
      }
      body['isDeleted'] = null;
      body['password'] = Md5.hashStr(body['password']);
      console.log("body['password']", body['password']);
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
    const pass =  Md5.hashStr(body2.password);
    if (!user || user.isDeleted != null) {
      return { status: false, msg: 'user not found', status_code: 404 };
    }

    if (user.password != pass) {
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
    if (user.isDeleted) {
      user.first_name = body3.first_name;
      user.last_name = body3.last_name;
      await this.usersRepository.save(user);
    } else {
      return { status: false, msg: 'user not found', status_code: 404 };
    }

    console.log(user);
  }
  async deleteUser(Id) {
    console.log(Id);
    const user = await this.usersRepository.findOneBy({
      id: parseInt(Id),
    });
    if (user.isDeleted == null) {
      const user = await this.usersRepository.findOneBy({
        id: parseInt(Id.id),
      });
      let d = new Date();
      user.isDeleted = d;
      await this.usersRepository.save(user);
      return user;
    } else {
      return { status: false, msg: 'user not found', status_code: 404 };
    }
  }
}
