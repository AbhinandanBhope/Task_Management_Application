import { User } from 'src/entites/user.entity';
import { DataSourceOptions, DataSource } from 'typeorm';

const dataSourceOption: DataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5433,
    username: 'postgres',
    password: process.env.Password,
    database: 'contact_book',
    entities: [User],
    synchronize: true,
    migrations: ['./database/migrations/*{.ts,.js}'],
    migrationsTableName: 'migrations',
};
const dataSource = new DataSource(dataSourceOption);
export default dataSource;







