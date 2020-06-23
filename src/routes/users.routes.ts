import { Router } from 'express';

import UsersRepository from '../repositories/UsersRepository';

const usersRouter = Router();

const usersRepository = new UsersRepository();

usersRouter.post('/', (req, res) => {
  const { name, email, password, birthDate } = req.body;
  const emailAlreadyExists = usersRepository.findByEmail(email);
  if (emailAlreadyExists) {
    return res.status(400).json({ error: 'This email is already in use' });
  }

  const user = usersRepository.create(name, email, password, birthDate);

  return res.json(user);
});

usersRouter.get('/', (req, res) => {
  const appointments = usersRepository.all();
  return res.json(appointments);
});

export default usersRouter;
