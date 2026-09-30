import Ambiente from '../models/Ambiente.js';

class AmbienteController{

    static async listarAmbientes(req, res){
        try{
            const listarAmbientes = await Ambiente.buscarTodos();  
            res.status(200).json(listarAmbientes);
        }
        catch(error){
            res.status(500).json({message: `${error} - falha na requisição`})
        }
    }

    static async listarAmbientesPorId(req, res){
        const idProcurado = req.params.id;
        try{
            const listarAmbientes = await Ambiente.buscarAmbientePorId(idProcurado);
            res.status(200).json(listarAmbientes);
        }
        catch(error){
            res.status(500).json({message: `${error} - falha na requisição`})
        }
    }

    static async removerAmbiente(req,res){
        const idProcurado = req.params.id;
        try{
            const listarAmbientes = await Ambiente.removerAmbiente(idProcurado);
            res.status(200).json({message: "Removido com sucesso"});
        }
        catch(error){
            res.status(500).json({message: `${error} - falha na requisição`})
        }
    }

    static async inserirAmbiente(req,res){
        const AmbienteNovo = req.body;
        try{
            const result = await Ambiente.inserirAmbiente(AmbienteNovo);
            res.status(200).json({message: "Inserido com sucesso"});
        }
        catch(error){
            res.status(500).json({message: `${error} - falha na requisição`})
        }
    }

    static async alterarAmbiente(req, res){
        const idAmbiente = req.params.id;
        const { nome, capacidade, idPredio, andar, idTipo } = req.body;
        try{
            const result = await Ambiente.alterarAmbiente({idAmbiente: idAmbiente, nome: nome, capacidade: capacidade, idPredio: idPredio, andar: andar, idTipo: idTipo });
            res.status(200).json({message: "Alterado com sucesso"});
        }
        catch(error){
            res.status(500).json({message: `${error} - falha na requisição`})
        }   

    }
}
export default AmbienteController;