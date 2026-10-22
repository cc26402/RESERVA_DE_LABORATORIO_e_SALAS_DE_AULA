import express from 'express';
import StatusController from '../controllers/StatusController.js';

const routes = express.Router();
routes.get("/status", StatusController.listarStatus);
export default routes;