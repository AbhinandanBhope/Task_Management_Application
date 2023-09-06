import { Controller, Get, Post ,Req } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor( private TaskService: TasksService){

}
}
