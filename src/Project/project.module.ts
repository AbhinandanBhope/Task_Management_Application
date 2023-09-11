import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from 'src/entites/project.entity';
import { JwtService } from '@nestjs/jwt';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { User } from 'src/entites/user.entity';
import { UsersService } from 'src/Users/user.service';
@Module({
  imports: [TypeOrmModule.forFeature([Project ,  User])],
  controllers: [ProjectController],
  providers: [ProjectService ,JwtService],
})
export class ProjectModule {}
