import { Controller, Get, Post,Request , UseGuards ,ValidationPipe,Body ,Param,Put,Delete,SetMetadata} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { AuthGuard } from 'src/Guard/auth.guard';
import{CreateTaskDto} from 'src/validation/taskValidation.dto'
import { CreateUpdateTaskDto } from 'src/validation/taskUpdate.dto';
import { RolesGuard } from 'src/Guard/admin-role.guard';


@Controller('tasks')
export class TasksController {
  constructor(private TaskService: TasksService) {
    
  }


  @UseGuards(AuthGuard)
  @SetMetadata('roles', ['Project_manager'])
  @UseGuards(RolesGuard)
  @Post('/:Id')
  createTask(@Request() req,
  @Body(new ValidationPipe()) CreateTaskDto: CreateTaskDto,@Param() Id: any,@Param() devId: any) {
    console.log(CreateTaskDto.devId,Id.Id);
    
    this.TaskService.createTask(CreateTaskDto ,req['user'],Id.Id);
    
  }
  @UseGuards(AuthGuard)
  @Get('get/:Id')
  getTaskById(@Param() Id: any){
    return this.TaskService.getTaskById(Id.Id);


  }

  @UseGuards(AuthGuard)
  @SetMetadata('roles', ['Project_manager'])
  @UseGuards(RolesGuard)
  @Put('/:Id')
  updateTaskById(@Request() req,@Body(new ValidationPipe()) body:CreateUpdateTaskDto,@Param() Id: any){
    
    

    
    return this.TaskService.updateTask(Id.Id,body,req.user.id);


  }
  @UseGuards(AuthGuard)
  @SetMetadata('roles', ['Project_manager'])
  @UseGuards(RolesGuard)
  @Delete('/:Id')
  deleteTask(@Request() req,@Param() Id: any){
    return this.TaskService.deleteTask(req.user.id ,Id);
    


  }
  @UseGuards(AuthGuard)
  @Get("user")
  userTask(@Request() req,@Param() Id: any){


    
    return this.TaskService.getUserTask(Id.id,req.user.id);


  }

}
