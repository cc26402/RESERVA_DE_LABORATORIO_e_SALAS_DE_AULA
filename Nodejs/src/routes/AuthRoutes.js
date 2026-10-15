import express from 'express';
import AuthController from '../controllers/AuthController.js';

const routes = express.Router();
routes.get('/auth/login', AuthController.login);
routes.post('/auth/cadastro', AuthController.cadastro);

export default routes;