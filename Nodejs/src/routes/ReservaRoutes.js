import express from 'express';
import ReservaController from '../controllers/ReservaController.js';

const routes = express.Router();
routes.get("/reservas", ReservaController.listarReservas);//
routes.get("/reservas/usuario/:username", ReservaController.listarReservasPorUsername);//
routes.get("/reservas/ambiente/:idAmbiente", ReservaController.listarReservasPorIdAmbiente);//
routes.get("/reservas/status/:idStatus", ReservaController.listarReservasPorIdStatus);//
routes.get("/reservas/periodo/:dataInicial/:dataFinal/:horarioInicial/:horarioFinal", ReservaController.listarReservasPorPeriodo);//
routes.get("/reservas/data/:dataInicial", ReservaController.listarReservasPorData);//
routes.get("/reservas/:id", ReservaController.listarReservasPorId);//
routes.delete("/reservas/:id", ReservaController.removerReserva);//
routes.post("/reservas", ReservaController.inserirReserva);//
routes.patch("/reservas/:id", ReservaController.alterarReserva);//

export default routes;