import express from 'express';
import ReservaController from '../controllers/ReservaController.js';
import AuthMiddleware from '../middlewares/AuthMiddleware.js';

const routes = express.Router();
routes.get("/reservas", ReservaController.listarReservas);//
routes.get("/reservas/minhas", AuthMiddleware.authMiddleware, ReservaController.listarMinhasReservas);
routes.get("/reservas/usuario/:username", ReservaController.listarReservasPorUsername);//
routes.get("/reservas/ambiente/:idAmbiente", ReservaController.listarReservasPorIdAmbiente);//
routes.get("/reservas/status/:idStatus", ReservaController.listarReservasPorIdStatus);//
routes.get("/reservas/periodo/:dataInicial/:dataFinal/:horarioInicial/:horarioFinal", ReservaController.listarReservasPorPeriodo);//
routes.get("/reservas/data/:dataInicial", ReservaController.listarReservasPorData);//
routes.get("/reservas/:id", ReservaController.listarReservasPorId);//
routes.delete("/reservas/:id", AuthMiddleware.authMiddleware, ReservaController.removerReserva);
routes.post("/reservas", AuthMiddleware.authMiddleware, ReservaController.inserirReserva);
routes.patch("/reservas/:id", AuthMiddleware.authMiddleware, ReservaController.alterarReserva);

export default routes;