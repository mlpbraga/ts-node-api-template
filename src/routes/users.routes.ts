import { Router } from 'express';
import multer from 'multer';
import { getCustomRepository } from 'typeorm';

import uploadConfig from '../config/upload';
import UsersRepository from '../repositories/UsersRepository';
import CreateUsersService from '../services/CreateUserService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

const usersRouter = Router();
const upload = multer(uploadConfig);

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

usersRouter.get('/', ensureAuthenticated, async (req, res) => {
  const usersRepository = getCustomRepository(UsersRepository);
  const appointments = await usersRepository.find();
  return res.json(appointments);
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (req, res) => {
    try {
      const updateUserAvatar = new UpdateUserAvatarService();
      const user = await updateUserAvatar.execute({
        userId: req.user.id,
        avatarFilename: req.file.filename,
      });
      delete user.password;
      return res.json(user);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
);

export default usersRouter;
