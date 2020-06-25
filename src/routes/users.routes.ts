import { Router } from 'express';

import { getCustomRepository } from 'typeorm';
import UsersRepository from '../repositories/UsersRepository';
import CreateUsersService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (req, res) => {
  try {
    const { name, email, password, birthDate } = req.body;
    const createUser = new CreateUsersService();
    const user = await createUser.execute({ name, email, password, birthDate });
    delete user.password;
    return res.json(user);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

usersRouter.get('/', async (req, res) => {
  const usersRepository = getCustomRepository(UsersRepository);
  const appointments = await usersRepository.find();
  return res.json(appointments);
});

export default usersRouter;
