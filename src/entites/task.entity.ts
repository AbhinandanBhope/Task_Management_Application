import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Project } from './project.entity';
import { User } from './user.entity';
@Entity({ database: 'Task' })
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  task_Name: string;

  @Column()
  task_Description: string;

  @Column({default:"Todo"})
  task_Status: string;


  @Column({ nullable: false })
  createdAt: Date;

  @Column({ nullable: true })
  isDeleted: Date;

  @Column({ name: 'user_id' })
  userId: String;

  @Column({ name: 'project_id' })
  projectId: String;

  @ManyToOne(() => Project, (project) => project.Task, {
    nullable: true,
  })
  @JoinColumn({ name: "project_id"} )
  project: Project;

  @OneToOne(() => User, (user) => user.task, {  nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
