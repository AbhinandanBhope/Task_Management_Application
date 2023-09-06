import { type } from 'os';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany ,ManyToMany,JoinTable } from 'typeorm';
import{Tasks} from './tasks.entity'
import { User } from './user.entity';
@Entity(
    { database: "Projects" }
)
export class Projects {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    project_name: string;
    @Column()
    Project_Manager: number;

    @Column()
    Project_Description: string;

    @Column({ nullable: false})
    createdAt:Date
    
    @Column({ nullable: true})
    isDeleted:Date

    @OneToMany( type => Tasks, Task => Task.id)
    Tasks:  Tasks[];

    @ManyToMany( () => User)
    @JoinTable()
    Users: User[]
}
