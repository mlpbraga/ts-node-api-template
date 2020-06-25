import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column('timestamp')
  birthDate: Date;
}

export default Users;
