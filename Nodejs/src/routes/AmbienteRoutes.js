import express from 'express';
import AmbienteController from '../controllers/AmbienteController.js';

const routes = express.Router();
routes.get("/ambientes", AmbienteController.listarAmbientes);

routes.get("/ambientes/ativos", AmbienteController.listarAmbientesAtivos);
routes.get("/ambientes/inativos", AmbienteController.listarAmbientesInativos);
routes.get("/ambientes/:id", AmbienteController.listarAmbientesPorId);
routes.delete("/ambientes/:id", AmbienteController.removerAmbiente);
routes.post("/ambientes", AmbienteController.inserirAmbiente);
routes.patch("/ambientes/:id", AmbienteController.alterarAmbiente);

export default routes;