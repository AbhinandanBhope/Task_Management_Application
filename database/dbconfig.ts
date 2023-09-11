import { User } from "src/entites/user.entity";
import { Project } from "src/entites/project.entity";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from "src/entites/task.entity";
import * as dotenv from 'dotenv';
dotenv.config();
   
console.log(process.env.PASSWORD  , "passeord") 

export const databaseConnections = [ 
    TypeOrmModule.forRoot({
        type: 'postgres',
        host: process.env.HOSTNAME,
        port: 5433,
        username: 'postgres',
        password:process.env.PASSWORD ,
        database: 'contact_book',
        entities: [User ,Project ,  Task],
        synchronize: true, 
    })
];
