import { Controller, Get, Post,Request , UseGuards ,ValidationPipe,Body ,Param,Put,Delete} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { AuthGuard } from 'src/Guard/auth.guard';
import{CreateTaskDto} from 'src/validation/taskValidation.dto'
import { CreateUpdateTaskDto } from 'src/validation/taskUpdate.dto';

@Controller('tasks')
export class TasksController {
  constructor(private TaskService: TasksService) {
    
  }


  @UseGuards(AuthGuard)
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
  @Put('/:Id')
  updateTaskById(@Request() req,@Body(new ValidationPipe()) body:CreateUpdateTaskDto,@Param() Id: any){
    
    

    
    return this.TaskService.updateTask(Id.Id,body,req.user.id);


  }
  @UseGuards(AuthGuard)
  @Delete('/:Id')
  deleteTask(@Request() req,@Param() Id: any){
    return this.TaskService.deleteTask(req.user.id ,Id);
    console.log(Id);
    console.log(req.user);


  }
  @UseGuards(AuthGuard)
  @Get("user")
  userTask(@Request() req,@Param() Id: any){


    console.log(Id.Id);
    console.log(req.user.id);
    return this.TaskService.getUserTask(Id.id,req.user.id);


  }

}
