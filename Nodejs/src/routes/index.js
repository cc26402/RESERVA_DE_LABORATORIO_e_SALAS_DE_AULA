import express from 'express';
import Ambiente from '../models/Ambiente';

const routes = (app) => {
    app.route("/").get((req,res) => res.status(200).json({message: "API rodando"}));
    
    app.use(express.json(), curso);
}

export default routes;