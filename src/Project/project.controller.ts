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
  SetMetadata,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from 'src/validation/projectValidation.dto';
import { ValidationPipe } from '../validation/validation.pipe';
import { AuthGuard } from 'src/Guard/auth.guard';
import { RolesGuard } from 'src/Guard/admin-role.guard';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @UseGuards(AuthGuard)
  @SetMetadata('roles', ['Project_manager'])
  @UseGuards(RolesGuard)
  @Post()
  createProject(
    @Request() req,
    @Body(new ValidationPipe()) CreateProjectDto: CreateProjectDto,
  ) {
    
    return this.projectService.createProject(req['user'], CreateProjectDto);
  }

  @UseGuards(AuthGuard)
  @SetMetadata('roles', ['Project_manager'])
  @UseGuards(RolesGuard)
  @Get()
  getProjectById(@Request() req) {
    return this.projectService.getAllProject(req['user']);
  }
  @UseGuards(AuthGuard)
  @SetMetadata('roles', ['Project_manager'])
  @UseGuards(RolesGuard)
  @Put('/:id')
  updateProject(
    @Request() req,
    @Body(new ValidationPipe()) body: CreateProjectDto,
    @Param() Id: any,
  ) {
    return this.projectService.updateProject(req['user'], body, Id);
  }
  @UseGuards(AuthGuard)
  @SetMetadata('roles', ['Project_manager'])
  @UseGuards(RolesGuard)
  @Delete('/delete/:id')
  deleteProject(@Request() req, @Param() Id: any) {
    const userId = req['user'];
    return this.projectService.deleteProject(Id, userId);
  }
}
