import express from 'express';
import NivelAcessoController from "../controllers/NivelAcessoController.js"

const routes = express.Router();
routes.get("/niveis_acesso", NivelAcessoController.listarTodos);
routes.get("/niveis_acesso/:id", NivelAcessoController.listarPorId);

export default routes;