import { uuid } from 'uuidv4';

class Users {
  id: string;

  name: string;

  password: string;

  email: string;

  birthDate: Date;

  constructor({ name, password, email, birthDate }: Omit<Users, 'id'>) {
    this.id = uuid();
    this.name = name;
    this.password = password;
    this.email = email;
    this.birthDate = birthDate;
  }
}

export default Users;
