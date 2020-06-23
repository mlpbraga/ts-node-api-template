import e from 'express';
import User from '../models/Users';
import UsersRepository from '../repositories/UsersRepository';

interface Request {
  name: string;
  email: string;
  password: string;
  birthDate: Date;
}

class CreateUserService {
  private usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  public execute({ name, email, password, birthDate }: Request): User {
    const emailAlreadyExists = this.usersRepository.findByEmail(email);
    if (emailAlreadyExists) {
      throw Error('This email is already in use');
    }
    const user = this.usersRepository.create({
      name,
      email,
      password,
      birthDate,
    });
    return user;
  }
}

export default CreateUserService;
