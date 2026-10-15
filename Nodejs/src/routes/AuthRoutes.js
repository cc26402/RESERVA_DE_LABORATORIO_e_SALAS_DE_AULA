import express from 'express';
import AuthController from '../controllers/AuthController.js';
import AuthMiddleware from '../middlewares/AuthMiddleware.js';

const routes = express.Router();
routes.post('/auth/login', AuthController.login);
routes.post('/auth/cadastro', AuthController.cadastro);
routes.post('/auth?validatoken', AuthMiddleware);

export default routes;