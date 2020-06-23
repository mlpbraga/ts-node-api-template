import User from '../models/Users';

interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  birthDate: Date;
}
class UsersRepository {
  private users: User[] = [];

  constructor() {
    this.users = [];
  }

  public create({ name, email, password, birthDate }: CreateUserDTO): User {
    const user = new User({ name, email, password, birthDate });
    this.users.push(user);
    return user;
  }

  public findByEmail(email: string): User | null {
    const findUser = this.users.find(user => user.email === email);

    return findUser || null;
  }

  public all(): User[] {
    return this.users;
  }
}

export default UsersRepository;
