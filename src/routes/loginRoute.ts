import * as express from 'express';
import loginCheck from '../database/middlewares/loginCheck';
import LoginController from '../database/controllers/LoginPostController';
import LoginGetController from '../database/controllers/LoginGetController';

const loginRoute = express.Router();

loginRoute.post(
  '/login',
  (req, res, next) => loginCheck.noInfo(req, res, next),
  (req, res) => LoginController.loginVerify(req, res),
);

loginRoute.get('/login/validate', (req, res) => LoginGetController.getUserRole(req, res));

export default loginRoute;
