import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/entites/task.entity';
import { Repository } from 'typeorm';
import { User } from 'src/entites/user.entity';
import { Project } from 'src/entites/project.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private TaskRepository: Repository<Task>,
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createTask(body, user, Id) {
    const userN = await this.usersRepository.findOneBy({
      id: parseInt(user.id),
    });

    if (userN.Role != 'Project_manager') {
      return {
        status: false,
        msg: 'You are not Project Manager',
        status_code: 404,
      };
    }
    const findProject = await this.projectRepository.findOneBy({
      id: parseInt(Id),
    });

    const Taskdev = new User();

    console.log(Taskdev);

    const taskA = new Task();
    taskA.createdAt = new Date();
    taskA.isDeleted = null;
    taskA.project = findProject;
    taskA.user = userN;
    taskA.task_Description = body.task_Description;
    taskA.task_Name = body.task_Name;
    taskA.task_Status = body.task_Status;
    const addProject = await this.TaskRepository.manager.save(taskA);
    return addProject;
  }
  async getTaskById(Id) {
    const Task = await this.TaskRepository.findOneBy({
      id: parseInt(Id),
      user: true,
    });

    console.log(Task);

    return Task;
  }

  async getUserTask(Id, user_id) {
    const tasks = await this.TaskRepository.findBy({
      userId:user_id ,
      isDeleted:null
      
    });
    return tasks;
  }
  async updateTask(Id, body, user_id) {
    const userN = await this.usersRepository.findOneBy({
      id: parseInt(user_id),
      isDeleted:null
    });

    let task = await this.getTaskById(Id);
    const projectId = Number(task.projectId);
    const findProject = await this.projectRepository.findOneBy({
      id: projectId,
      isDeleted:null
    });
    console.log(findProject);
    if (!findProject.isDeleted || !task.isDeleted) {
      return {
        status: false,
        msg: 'Task not found',
        status_code: 404,
      };
    }
    if (findProject.project_Manager != userN.id) {
      return {
        status: false,
        msg: 'You are not Project Manager',
        status_code: 404,
      };
    }

    task.task_Name = body.name;
    task.task_Description = body.task_Description;
    task.task_Status = body.task_Status;

    const updatedTask = await this.TaskRepository.save(task);

    return updatedTask;
  }
  async deleteTask(user_id, id) {
    const userN = await this.usersRepository.findOneBy({
      id: parseInt(user_id),
    });
    let task = await this.getTaskById(id);
    const projectId = Number(task.projectId);
    const findProject = await this.projectRepository.findOneBy({
      id: projectId,
    });
    console.log(findProject);

    if (findProject.project_Manager != userN.id) {
      return {
        status: false,
        msg: 'You are not Project Manager',
        status_code: 404,
      };
    }
    let d = new Date();
    task.isDeleted = d;
    const deletedTask = await this.TaskRepository.save(task);
    return deletedTask;
  }
}
