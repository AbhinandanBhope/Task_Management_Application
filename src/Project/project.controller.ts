import { Body, Controller, Post ,Request,UseGuards} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from 'src/validation/projectValidation.dto';
import {ValidationPipe} from '../validation/validation.pipe';
import { AuthGuard } from 'src/Guard/auth.guard';


@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}
  
  @UseGuards(AuthGuard)
    @Post()
    createProject(@Request() req  ,@Body((new ValidationPipe()) ) CreateProjectDto: CreateProjectDto){

        
        console.log(CreateProjectDto);
        console.log( req["user"] , 'DECODED DATA:::::::::')
      return this.projectService.createProject(req["user"],CreateProjectDto);


    }
  }

