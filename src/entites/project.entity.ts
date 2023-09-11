import { type } from 'os';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany ,ManyToMany,JoinTable } from 'typeorm';
import{Task} from './task.entity'
import { User } from './user.entity';
@Entity(
    { database: "Project" }
)
export class Project {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique:true})
    project_Name: string;
    @Column()
    project_Manager: number;

    @Column()
    project_Description: string;

    @Column({ nullable: false})
    createdAt:Date
    
    @Column({ nullable: true})
    isDeleted:Date

    @OneToMany( type => Task, Task => Task.id)
    Task:  Task[];

    @ManyToMany( () => User)
    @JoinTable()
    Users: User[]
}
