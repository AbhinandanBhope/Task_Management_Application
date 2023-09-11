import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Project } from 'src/entites/project.entity';
import { User } from 'src/entites/user.entity';
import { Task } from 'src/entites/task.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Project ,  User ,Task])],
  controllers: [TasksController],
  providers: [TasksService,JwtService],
})
export class TasksModule {}
