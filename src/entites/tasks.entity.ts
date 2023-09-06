import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Projects } from './projects.entity';
@Entity({ database: 'Tasks' })
export class Tasks {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Task_name: string;

  @Column()
  Task_Description: string;

  @Column()
  Task_Status: string;

  @Column({ nullable: false })
  createdAt: Date;

  @Column({ nullable: true })
  isDeleted: Date;

  @ManyToOne((type) => Projects, (project) => project.Tasks)
  project: Projects;
}
