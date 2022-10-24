import * as express from 'express';
import loginMiddleware from '../middlewares/loginMiddle';
import LoginController from '../controllers/user.controller';
import verifyToken from '../middlewares/validateToken';

const LoginRouter = express.Router();

const controller = new LoginController();

LoginRouter.post('/', loginMiddleware, controller.findUser);
LoginRouter.get('/validate', verifyToken, controller.findUserRole);

export default LoginRouter;
