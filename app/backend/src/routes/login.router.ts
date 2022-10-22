import * as express from 'express';
import UserController from '../controllers/user.controller';
import validateLogin from '../middlewares/validateLogin';

const router = express.Router();
const userController = new UserController();

router.post('/login', validateLogin, userController.login);

export default router;
