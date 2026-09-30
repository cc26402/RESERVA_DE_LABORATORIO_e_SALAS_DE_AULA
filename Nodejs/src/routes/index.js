import express from 'express';
import Ambiente from '../models/Ambiente';
import Usuario from '../models/Usuario';

const routes = (app) => {
    app.route("/").get((req,res) => res.status(200).json({message: "API rodando"}));
    
    app.use(express.json(), Ambiente, Usuario);
}

export default routes;