import express from 'express';
import AuthController from '../controllers/authController.js';
import AuthMiddleware from '../middlewares/AuthMiddleware.js';

const routes = express.Router();
routes.post('/auth/login', AuthController.login);
routes.post('/auth/cadastro', AuthController.cadastro);
routes.post('/auth/valida', AuthMiddleware.authMiddleware, AuthMiddleware.tokenValido);

export default routes;