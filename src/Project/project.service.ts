import { Injectable } from '@nestjs/common';
import { Project } from 'src/entites/project.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entites/user.entity';


Injectable();
export class ProjectService {
    constructor(
        @InjectRepository(Project)
        private projectRepository: Repository<Project> ,
        @InjectRepository(User)
        private usersRepository: Repository<User>
      ) {}
      
     async createProject(user ,body){                               
        
        try {
          const userN = await this.usersRepository.findOneBy({
            id: parseInt(user.id),
          });
          console.log(body.project_Name)
          const findProject = await this.projectRepository.findOneBy({ project_Name:body.project_Name});
        
          if(findProject){
            


            return { status: false, msg: 'Name already Taken Try Another', status_code: 404 };
          }
          if(userN.Role !='Project_manager'){
            return { status: false, msg: 'You are not Project Manager', status_code: 404 };
            

          }
          console.log(userN);
            body['createdAt']= new Date();
            body['isDeleted'] = null;
            body['project_Manager'] = user.id;
            console.log(body);

           const addProject = await this.projectRepository.save(body);
            return addProject;
          } catch (err) {
            console.log(err);
            return err;
          } 
        

          
    }
    async getAllProject(user){
    
      const projects= await this.projectRepository.findBy({
        project_Manager: user.id,
        isDeleted :null
      });
      console.log(projects)
      return projects;


    }

    async deleteProject(Id,userId){
      // also delete all tasks  further
      
     const user = await this.usersRepository.findOneBy({
        id: parseInt(userId.id),
      });
      const findProject = await this.projectRepository.findOneBy({ id:Id.id});
      if (user.isDeleted == null && findProject.isDeleted == null) {
        
        
        let d = new Date();
        findProject.isDeleted = d;
        await this.projectRepository.save(findProject);
        return findProject;
      } else {
        return { status: false, msg: 'Project not found', status_code: 404 };
      } 
      




    }
    async updateProject(user,body ,Id){
      const findProject = await this.projectRepository.findOneBy({ id:Id.id});
      if(user.id == findProject.project_Manager){
        findProject.project_Name = body.project_name;
        findProject.project_Description = body.Project_Description;
        await this.projectRepository.save(findProject);
        return findProject;

      }
      else{
        return { status: false, msg: 'You are not Project Manager', status_code: 404 };

      }
      
      


      
    }
}
