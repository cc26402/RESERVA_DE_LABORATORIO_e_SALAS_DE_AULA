import express from 'express';
import UsuarioController from '../controllers/UsuarioController.js';
import AuthMiddleware from '../middlewares/AuthMiddleware.js';

const routes = express.Router();
routes.get("/usuarios", UsuarioController.listarUsuarios);

routes.get("/usuarios/meusdados", AuthMiddleware, UsuarioController.listarUsuariosPorId);
routes.get("/usuarios/:id", UsuarioController.listarUsuariosPorId);
routes.delete("/usuarios/:id", UsuarioController.removerUsuario);
routes.post("/usuarios", UsuarioController.inserirUsuario);
routes.patch("/usuarios/meusdados", AuthMiddleware, UsuarioController.alterarUsuario);
routes.patch("/usuarios/:id", UsuarioController.alterarUsuario);

export default routes;