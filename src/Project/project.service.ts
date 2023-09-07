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
          const findProject = await this.projectRepository.findOneBy({ project_name:body.project_name});
          if(findProject){
            return { status: false, msg: 'Name already Taken Try Another', status_code: 404 };
          }
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
    async getAllProject(user){
      const projects= await this.projectRepository.findBy({
        Project_Manager: user.id,
      });
      console.log(projects)
      return projects;


    }

    async deleteProject(){
      // also delete all tasks  further




    }
    async updateProject(user,body ,Id){
      const findProject = await this.projectRepository.findOneBy({ id:Id.id});
      if(user.id == findProject.Project_Manager){
        findProject.project_name = body.project_name;
        findProject.Project_Description = body.Project_Description;
        await this.projectRepository.save(findProject);
        return findProject;

      }
      else{
        return { status: false, msg: 'You are not Project Manager', status_code: 404 };

      }
      
      


      
    }
}
