import { Injectable } from '@nestjs/common';
import { Projects } from 'src/entites/projects.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entites/user.entity';


Injectable();
export class ProjectService {
    constructor(
        @InjectRepository(Projects)
        private projectRepository: Repository<Projects > ,
        @InjectRepository(User)
        private usersRepository: Repository<User>
      ) {}
      
     async createProject(user ,body){                               
        
        try {
          const userN = await this.usersRepository.findOneBy({
            id: parseInt(user.id),
          });
          if(userN.Role !='Project_manager'){
            return { status: false, msg: 'You are not Project Manager', status_code: 404 };
            

          }
          console.log(userN);
            body['createdAt']= new Date();
            body['isDeleted'] = null;
            body['Project_Manager'] = user.id;

           const addProject = await this.projectRepository.save(body);
            return addProject;
          } catch (err) {
            return err;
          } 
        

          
    }
    async deleteProject(){
      // also delete all tasks  further




    }
}
