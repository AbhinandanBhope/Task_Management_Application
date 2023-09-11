import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  Get,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from 'src/validation/projectValidation.dto';
import { ValidationPipe } from '../validation/validation.pipe';
import { AuthGuard } from 'src/Guard/auth.guard';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @UseGuards(AuthGuard)
  @Post()
  createProject(
    @Request() req,
    @Body(new ValidationPipe()) CreateProjectDto: CreateProjectDto,
  ) {
    console.log(CreateProjectDto);
    console.log(req['user'], 'DECODED DATA:::::::::');
    return this.projectService.createProject(req['user'], CreateProjectDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  getProjectById(@Request() req) {
    return this.projectService.getAllProject(req['user']);
  }
  @UseGuards(AuthGuard)
  @Put('/:id')
  updateProject(
    @Request() req,
    @Body(new ValidationPipe()) body: CreateProjectDto,
    @Param() Id: any,
  ) {
    return this.projectService.updateProject(req['user'], body, Id);
  }
  @UseGuards(AuthGuard)
  @Delete('/delete/:id')
  deleteProject(@Request() req, @Param() Id: any) {
    const userId = req['user'];
    return this.projectService.deleteProject(Id, userId);
  }
}
