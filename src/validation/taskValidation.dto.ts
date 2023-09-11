import { IsString, IsEmpty, isString, IsNumber, IsInt } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  task_Name: string;

  @IsString()
  task_Description: string;
  
  @IsString()
  task_Status: string;

  @IsNumber()
  devId:number;
}
