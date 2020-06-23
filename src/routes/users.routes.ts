import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';

import User from '../models/Users';

const usersRouter = Router();

const users: User[] = [];

usersRouter.post('/', (req, res) => {
  const { name, email, password, birthDate } = req.body;

  const user = new User(
    name,
    email,
    password,
    startOfHour(parseISO(birthDate)),
  );
  users.push(user);
  return res.json(user);
});

export default usersRouter;
