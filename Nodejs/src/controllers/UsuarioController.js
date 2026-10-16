import Usuario from '../models/Usuario.js';

class UsuarioController{

    static async listarUsuarios(req, res){
        try{
            const listarUsuarios = await Usuario.buscarTodos();  
            res.status(200).json(listarUsuarios);
        }
        catch(error){
            res.status(500).json({message: `${error} - falha na requisição`})
        }
    }

    static async listarUsuariosPorId(req, res){
        const CPFProcurado = (req.params.id ? req.params.id : req.CPF);
        try{
            const listarUsuarios = await Usuario.buscarUsuarioPorCPF(CPFProcurado);
            res.status(200).json(listarUsuarios);
        }
        catch(error){
            res.status(500).json({message: `${error} - falha na requisição`})
        }
    }

    static async removerUsuario(req,res){
        const idProcurado = (req.params.id ? req.params.id : req.CPF);
        try{
            const listarUsuarios = await Usuario.removerUsuario(idProcurado);
            res.status(200).json({message: "Removido com sucesso"});
        }
        catch(error){
            res.status(500).json({message: `${error} - falha na requisição`})
        }
    }

    static async inserirUsuario(req,res){
        const UsuarioNovo = req.body;
        try{
            const result = await Usuario.inserirUsuario(UsuarioNovo);
            res.status(200).json({message: "Inserido com sucesso"});
        }
        catch(error){
            res.status(500).json({message: `${error} - falha na requisição`})
        }
    }

    static async alterarUsuario(req, res){
        const CPF = (req.params.id ? req.params.id : req.CPF);
        const dadosNovos = req.body
        try{
            const result = await Usuario.alterarUsuario({...dadosNovos, "CPF" : CPF});
            res.status(200).json({message: "Alterado com sucesso"});
        }
        catch(error){
            res.status(500).json({message: `${error} - falha na requisição`})
        }   

    }
}
export default UsuarioController;