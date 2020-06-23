import { Router } from 'express';
import { uuid } from 'uuidv4';
const usersRouter = Router();

const users = [];

usersRouter.post('/', (req, res) => {
  const { name, email, password } = req.body;
  const user = {
    id: uuid(),
    name,
    email,
    password,
  }
  users.push(user);
  return res.json(user);
});

export default usersRouter;
