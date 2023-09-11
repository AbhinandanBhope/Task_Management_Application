import { IsString, IsEmpty } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  project_Name: string;

  @IsString()
  project_Description: string;
}
