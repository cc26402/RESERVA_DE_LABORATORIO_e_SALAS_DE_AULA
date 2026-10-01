import express from 'express';
import AmbienteRoutes from './AmbienteRoutes.js';
import UsuarioRoutes from './UsuarioRoutes.js';
import ReservaRoutes from './ReservaRoutes.js';

const routes = (app) => {
    app.route("/").get((req,res) => res.status(200).json({message: "API rodando"}));
    
    app.use(express.json(), AmbienteRoutes, UsuarioRoutes, ReservaRoutes);
}

export default routes;