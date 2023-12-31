import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Request,
  Put,
  UseGuards,
  Delete
} from '@nestjs/common';

import { UsersService } from './user.service';
import { CreateUserDto } from '../validation/userValidation.dto';
import { ValidationPipe } from '../validation/validation.pipe';
import { CreateLoginUserDto } from '../validation/loginValidation.dto';
import { AuthGuard } from 'src/Guard/auth.guard';
import { request } from 'http';
import { copyFileSync } from 'fs';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/create')
  registerUser(@Body(new ValidationPipe()) body: CreateUserDto) {
    return this.usersService.createUser(body);
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  getUserById(@Request() req  ,   @Param() params: any){
  
    return this.usersService.getUserById(params.id);
  }

  @Post('/login')
  login(@Body(new ValidationPipe()) body2: CreateLoginUserDto) {
    return this.usersService.loginUser(body2);
  }

  @UseGuards(AuthGuard)
  @Put('update')
  updateUser(@Request() req,
    @Body(new ValidationPipe()) body3: CreateUserDto,
    
  ) { console.log(req.user)
  return this.usersService.updateUser(req.user,body3);
  }
  @UseGuards(AuthGuard)
  @Delete('/:id')
  deleteUser( @Request() req, @Param() Id: any){
    return this.usersService.deleteUser(Id);

  }

}
