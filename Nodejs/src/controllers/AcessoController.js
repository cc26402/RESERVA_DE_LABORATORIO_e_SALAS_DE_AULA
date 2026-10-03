import '../models/Acesso.js';

class AmbienteController{
    static async listarTodosAcessos(req, res){
        try{
            const todosAcessos = await Acesso.buscarTodos();
            res.status(200).json(todosAcessos);
        }
        catch(error){
            res.status(500).json(`Erro na requisição: ${error}`);
        }
    }

    static async listarAcessoPorId(req, res){
        const id = req.params.id;
        try{
            const acesso = await Acesso.buscaPorId(id);
            res.status(200).json(acesso);
        }
        catch(error){
            res.status(500).json({message: `Erro na requisição: ${error}`});
        }
    }

    static async listarAcessosUsername(req, res){
        const username = req.params.username
        try{
            const acessosUsername = await Acesso.buscaPorUsername(username);
            res.status(200).json(acessosUsername);
        }
        catch(error){
            res.status(500).json({message: `Erro na requisição: ${error}`});
        }
    }

    static async listarAcessosPorData(req, res){
        const data = req.params.data;
        try{
            const acessosDaData = await Acesso.buscarPorPeriodoEUsuario(data);
            res.status(200).json(acessosDaData);
        }
        catch(error){
            res.status(500).json({message: `Erro na requisição: ${error}`});
        }
    }
}