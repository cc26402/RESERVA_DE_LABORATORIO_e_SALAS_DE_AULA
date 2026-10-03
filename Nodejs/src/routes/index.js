import express from 'express';
import AmbienteRoutes from './AmbienteRoutes.js';
import UsuarioRoutes from './UsuarioRoutes.js';
import ReservaRoutes from './ReservaRoutes.js';
import PredioRoutes from './PredioRoutes.js';
import AcessoRoutes from './AcessoRoutes.js'

const routes = (app) => {
    app.route("/").get((req,res) => res.status(200).json({message: "API rodando"}));
    
    app.use(express.json(), AmbienteRoutes, UsuarioRoutes, ReservaRoutes, PredioRoutes, AcessoRoutes);
}

export default routes;