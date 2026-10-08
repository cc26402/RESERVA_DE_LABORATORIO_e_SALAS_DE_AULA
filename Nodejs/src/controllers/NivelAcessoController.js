import NivelAcesso from "../models/NivelAcesso.js";

export default class NivelAcessoController{

    static async listarTodos(req, res){
        try{
            const todosNiveis = await NivelAcesso.buscarTodos();
            res.status(200).json(todosNiveis);
        }
        catch(error){
            res.status(500).json({message: `Erro na requisição: ${error.message}`});
        }
    }

    static async listarPorId(req, res){
        const id = req.params.id;
        try{
            const todosNiveis = await NivelAcesso.buscarPorId(id);
            res.status(200).json(todosNiveis);
        }
        catch(error){
            res.status(500).json({message: `Erro na requisição: ${error.message}`});
        }
    }
}