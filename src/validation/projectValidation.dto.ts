import { IsString,  IsEmpty } from 'class-validator';


export class CreateProjectDto {
  @IsString()
  project_name: string;
  
  
   
  @IsString()
  Project_Description: string;
  


  


  

}