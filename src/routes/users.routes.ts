import { Router } from 'express';
import { uuid } from 'uuidv4';
import { startOfHour, parseISO } from 'date-fns';

const usersRouter = Router();

const users = [];

usersRouter.post('/', (req, res) => {
  const { name, email, password, birthDate } = req.body;

  const user = {
    id: uuid(),
    name,
    email,
    password,
    birthDate: startOfHour(parseISO(birthDate)),
  };
  users.push(user);
  return res.json(user);
});

export default usersRouter;
