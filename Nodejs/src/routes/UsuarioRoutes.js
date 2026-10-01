import express from 'express';
import UsuarioController from '../controllers/UsuarioController.js';

const routes = express.Router();
routes.get("/usuarios", UsuarioController.listarUsuarios);

routes.get("/usuarios/:id", UsuarioController.listarUsuariosPorId);
routes.delete("/usuarios/:id", UsuarioController.removerUsuario);
routes.post("/usuarios", UsuarioController.inserirUsuario);
routes.patch("/usuarios/:id", UsuarioController.alterarUsuario);

export default routes;