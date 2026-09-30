import express from 'express';
import UsuarioControllers from '../controllers/UsuarioController.js';

const routes = express.Router();
routes.get("/usuarios", UsuarioControllers.listarUsuarios);

routes.get("/usuarios/:id", UsuarioControllers.listarUsuariosPorId);
routes.delete("/usuarios/:id", UsuarioControllers.removerUsuario);
routes.post("/usuarios", UsuarioControllers.inserirUsuario);
routes.patch("/usuarios/:id", UsuarioControllers.alterarUsuario);

export default routes;