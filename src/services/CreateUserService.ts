import { getCustomRepository } from 'typeorm';
import User from '../models/Users';
import UsersRepository from '../repositories/UsersRepository';

interface Request {
  name: string;
  email: string;
  password: string;
  birthDate: Date;
}

class CreateUserService {
  public async execute({
    name,
    email,
    password,
    birthDate,
  }: Request): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const emailAlreadyExists = await usersRepository.findByEmail(email);
    if (emailAlreadyExists) {
      throw Error('This email is already in use');
    }
    const user = usersRepository.create({
      name,
      email,
      password,
      birthDate,
    });
    await usersRepository.save(user);
    return user;
  }
}

export default CreateUserService;
