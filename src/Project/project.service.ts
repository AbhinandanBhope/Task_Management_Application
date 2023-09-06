import { Injectable } from '@nestjs/common';
import { Projects } from 'src/entites/projects.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


Injectable();
export class ProjectService {
    constructor(
        @InjectRepository(Projects)
        private projectRepository: Repository<Projects>,
      ) {}
     async createProject(user ,body){                               
        console.log(user.id);
        console.log(body.project_name);
        console.log(body.Project_Description);
        try {
            body['createdAt']= new Date();
            body['isDeleted'] = null;
            body['Project_Manager'] = user.id;
            const addProject = await this.projectRepository.save(body);
            return addProject;
          } catch (err) {
            return err;
          } 
        

    }
}
