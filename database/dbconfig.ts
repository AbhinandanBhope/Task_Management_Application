import { User } from "src/entites/user.entity";
import { Projects } from "src/entites/projects.entity";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tasks } from "src/entites/tasks.entity";
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
        entities: [User ,Projects ,  Tasks],
        synchronize: true, 
    })
];
