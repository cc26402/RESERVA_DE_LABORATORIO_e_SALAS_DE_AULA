import express from 'express';
import AcessoController from "../controllers/AcessoController.js";

const routes = express.Router();
routes.get("/acessos/data/:data", AcessoController.listarAcessosPorData);
routes.get("/acessos/username/:username", AcessoController.listarAcessosPorUsername);
routes.get("/acessos/periodo/:dataInicio/:dataFim", AcessoController.listarAcessosPorPeriodo);
routes.get("/acessos/username-data/:username/:data", AcessoController.listarAcessosPorUsernameNaData);
routes.get("/acessos/username-periodo/:username/:dataInicio/:dataFim", AcessoController.listarAcessosPorUsernameNoPeriodo);
routes.get("/acessos/:id", AcessoController.listarAcessoPorId);
routes.get("/acessos", AcessoController.listarTodosAcessos);
routes.post("/acessos", AcessoController.registrarAcesso);

export default routes;