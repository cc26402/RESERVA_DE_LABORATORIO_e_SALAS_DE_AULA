import express from 'express';
import LoginController from '../controllers/LoginController.js';

const routes = express.Router();
routes.get('/logins/username/:username', LoginController.listarPorUsername);
routes.get('/logins/cpf/:CPF', LoginController.listarPorCpf);
routes.get('/logins/data-cad/:dataCadastro', LoginController.listarPorDataCadastro);
routes.get('/logins', LoginController.listarTodos);
routes.post('/logins', LoginController.inserirLogin);
routes.patch('/logins/:username', LoginController.alterarLogin);
routes.delete('/logins/:username', LoginController.removerLogin);

export default routes;