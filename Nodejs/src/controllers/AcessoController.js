import Acesso from '../models/Acesso.js';

class AmbienteController{
    static async listarTodosAcessos(req, res){
        try{
            const todosAcessos = await Acesso.buscarTodos();
            res.status(200).json(todosAcessos);
        }
        catch(error){
            res.status(500).json({message: `Erro na requisição: ${error.message}`});
        }
    }

    static async listarAcessoPorId(req, res){
        const id = req.params.id;
        try{
            const acesso = await Acesso.buscaPorId(id);
            res.status(200).json(acesso);
        }
        catch(error){
            res.status(500).json({message: `Erro na requisição: ${error.message}`});
        }
    }

    static async listarAcessosPorUsername(req, res){
        const username = req.params.username;
        try{
            const acessosUsername = await Acesso.buscaPorUsername(username);
            res.status(200).json(acessosUsername);
        }
        catch(error){
            res.status(500).json({message: `Erro na requisição: ${error.message}`});
        }
    }

    static async listarAcessosPorData(req, res){
        const data = req.params.data;
        try{
            const acessosDaData = await Acesso.buscarPorPeriodoEUsuario(data);
            res.status(200).json(acessosDaData);
        }
        catch(error){
            res.status(500).json({message: `Erro na requisição: ${error.message}`});
        }
    }

    static async listarAcessosPorPeríodo(req, res){
        const dataInicio = req.params.dataInicio;
        const dataFim = req.params.dataFim;
        try{
            const acessosDoPeriodo = await Acesso.buscaPorPeriodoEUsuario({dataInicio, dataFim});
            res.status(200).json(acessosDoPeriodo);
        }
        catch(error){
            res.status(500).json({message: `Erro na requisição: ${error.message}`});
        }
    }

    static async listarAcessosPorUsernameNaData(req, res){
        const username = req.params.username;
        const data = req.params.data;
        try{
            const acessosUserNaData = await Acesso.buscaPorPeriodoEUsuario({username, dataInicio: data});
            res.status(200).json(acessosUserNaData);
        }
        catch(error){
            res.status(500).json({message: `Erro na requisição: ${error.message}`});
        }
    }

    static async listarAcessosPorUsernameNoPerido(req, res){
        const username = req.params.username;
        const dataInicio = req.params.dataInicio;
        const dataFim = req.params.dataFim;
        try{
            const acessosUserNoPeriodo = await Acesso.buscaPorPeriodoEUsuario({username, dataInicio, dataFim});
            res.status(200).json(acessosUserNoPeriodo);
        }
        catch(error){
            res.status(500).json({message: `Erro na requisição: ${error.message}`});
        }
    }

    static async registrarAcesso(req, res){
        const acesso = req.body;
        try{
            const result = await Acesso.inserirRegistroDeAcesso(acesso);
            res.status(200).json({message: "Registro de acesso criado com sucesso."})
        }
        catch(error){
            res.status(500).json({messagem: `Erro ao requisitar criação do registro de acesso: ${error.message}`})
        }
    }
}