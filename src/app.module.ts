import { Module } from '@nestjs/common';
import { User } from './entites/user.entity';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'database/database.module';
import { userModule } from './Users/user.module';
import { TasksModule } from './tasks/tasks.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectModule } from './Project/project.module';


@Module({
  imports: [
    ConfigModule.forRoot({envFilePath:['.env']}),
    DatabaseModule,
    User,
    userModule,
    TasksModule,
    ProjectModule
    
    
  ],
  

  controllers: [AppController],

  providers: [AppService],
})
export class AppModule {}
