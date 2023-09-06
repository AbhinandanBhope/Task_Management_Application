import { TypeOrmModule } from '@nestjs/typeorm'; 
import { Module } from '@nestjs/common';
import { databaseConnections } from './dbconfig';

@Module({
    imports: [
        ...databaseConnections
        
    ],
    
    exports: [
        ...databaseConnections
    ]
})
export class DatabaseModule {}