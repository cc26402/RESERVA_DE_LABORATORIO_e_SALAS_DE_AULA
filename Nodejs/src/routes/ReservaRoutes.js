import express from 'express';
import ReservaController from '../controllers/ReservaController.js';

const routes = express.Router();
routes.get("/reservas", ReservaController.listarReservas);

routes.get("/reservas/:id", ReservaController.listarReservasPorId);
routes.delete("/reservas/:id", ReservaController.removerReserva);
routes.post("/reservas", ReservaController.inserirReserva);
routes.patch("/reservas/:id", ReservaController.alterarReserva);

export default routes;