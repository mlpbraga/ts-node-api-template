import User from '../models/Users';

class UsersRepository {
  private users: User[] = [];

  constructor() {
    this.users = [];
  }

  public create(
    name: string,
    email: string,
    password: string,
    birthDate: Date,
  ): User {
    const user = new User(name, email, password, birthDate);
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
