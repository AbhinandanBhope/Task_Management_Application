import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

import * as Jwt from 'jsonwebtoken';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
      return false;
    }
    console.log(roles, 'roles');

    const TokenArray = request.headers.authorization.split(' ');
    const user = TokenArray[1];

    const userRole= Jwt.decode(user);
    

    return roles.includes(userRole['role']);
  }
}
