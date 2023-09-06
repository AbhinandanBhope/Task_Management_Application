import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity(
    { database: "Users" }
)
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column({unique:true})
    email: string;

    @Column()
    password: string;

    @Column()
    Role: string;
 

    @Column({ nullable: true})
    isDeleted:Date
}