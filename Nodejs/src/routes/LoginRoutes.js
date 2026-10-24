import express from 'express';
import LoginController from '../controllers/LoginController.js';
import AuthMiddleware from '../middlewares/AuthMiddleware.js';

const routes = express.Router();
routes.get('/logins/username/:username', LoginController.listarPorUsername);
routes.get('/logins/cpf/:CPF', LoginController.listarPorCpf);
routes.get('/logins/data-cad/:dataCadastro', LoginController.listarPorDataCadastro);
routes.get('/logins', LoginController.listarTodos);
routes.patch('/logins/:CPF/:senhaAtual', LoginController.alterarLogin);
routes.patch('/logins/:senhaAtual', AuthMiddleware.authMiddleware, LoginController.alterarLogin);

export default routes;