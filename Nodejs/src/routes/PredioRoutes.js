import express from 'express';
import PredioController from '../controllers/PredioController.js';

const routes = express.Router();
routes.get("/predios", PredioController.listarPredios);

routes.get("/predios/:id", PredioController.listarPrediosPorId);
routes.delete("/predios/:id", PredioController.removerPredio);
routes.post("/predios", PredioController.inserirPredio);
routes.patch("/predios/:id", PredioController.alterarPredio);

export default routes;