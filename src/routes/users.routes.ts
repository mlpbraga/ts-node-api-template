import { Router } from 'express';

import UsersRepository from '../repositories/UsersRepository';
import CreateUsersService from '../services/CreateUserService';

const usersRouter = Router();

const usersRepository = new UsersRepository();

usersRouter.post('/', (req, res) => {
  try {
    const { name, email, password, birthDate } = req.body;
    const createUser = new CreateUsersService(usersRepository);
    const user = createUser.execute({ name, email, password, birthDate });
    return res.json(user);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

usersRouter.get('/', (req, res) => {
  const appointments = usersRepository.all();
  return res.json(appointments);
});

export default usersRouter;
