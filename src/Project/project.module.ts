import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Projects } from 'src/entites/projects.entity';
import { JwtService } from '@nestjs/jwt';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
@Module({
  imports: [TypeOrmModule.forFeature([Projects])],
  controllers: [ProjectController],
  providers: [ProjectService ,JwtService ],
})
export class ProjectModule {}
