import Predio from '../models/Predio.js';

class PredioController{

    static async listarPredios(req, res){
        try{
            const listarPredios = await Predio.buscarTodos();  
            res.status(200).json(listarPredios);
        }
        catch(error){
            res.status(500).json({message: `${error} - falha na requisição`})
        }
    }

    static async listarPrediosPorId(req, res){
        const idProcurado = req.params.id;
        try{
            const listarPredios = await Predio.buscarPredioPorId(idProcurado);
            res.status(200).json(listarPredios);
        }
        catch(error){
            res.status(500).json({message: `${error} - falha na requisição`})
        }
    }

    static async removerPredio(req,res){
        const idProcurado = req.params.id;
        try{
            const listarPredios = await Predio.removerPredio(idProcurado);
            res.status(200).json({message: "Removido com sucesso"});
        }
        catch(error){
            res.status(500).json({message: `${error} - falha na requisição`})
        }
    }

    static async inserirPredio(req,res){
        const PredioNovo = req.body;
        try{
            const result = await Predio.inserirPredio(PredioNovo);
            res.status(200).json({message: "Inserido com sucesso"});
        }
        catch(error){
            res.status(500).json({message: `${error} - falha na requisição`})
        }
    }

    static async alterarPredio(req, res){
        const idPredio = req.params.id;
        const { nome } = req.body;
        try{
            const result = await Predio.alterarPredio({idPredio: idPredio, nome: nome});
            res.status(200).json({message: "Alterado com sucesso"});
        }
        catch(error){
            res.status(500).json({message: `${error} - falha na requisição`})
        }   

    }
}
export default PredioController;