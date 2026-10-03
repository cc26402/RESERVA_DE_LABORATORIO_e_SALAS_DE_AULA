import Login from "../models/Login.js";

class LoginController{

    static async listarTodos(req, res){
        try{
            const listaLogins = await Login.buscarTodos();
            res.status(200).json(listaLogins);
        }
        catch(error){
            res.status(500).json({message: `Erro na requisição: ${error.message}`});
        }
    }

    static async listarPorUsername(req, res){
        const username = req.params.username;
        try{
            const loginUsername = await Login.buscarPorUsername(username);
            res.status(200).json(loginUsername);
        }
        catch(error){
            res.status(500).json({message: `Erro na requisição: ${error.message}`});
        }
    }

    static async listarPorCpf(req, res){
        CPF = req.params.CPF;
        try{
            const loginCpf = await Login.buscarPorCpf(CPF);
            res.status(200).json(loginCpf);
        }
        catch(error){
            res.status(500).json({message: `Erro na requisição: ${error.message}`});
        }
    }

    static async listarPorDataCadastro(req, res){
        const dataCadastro = req.params.dataCadastro;
        try{
            const loginsCriadosNaData = await Login.buscarPorDataCadastro(dataCadastro);
            res.status(200).json(loginsCriadosNaData);
        }
        catch(error){
            res.status(500).json({message: `Erro na requisição: ${error.message}`});
        }
    }

    static async inserirLogin(req, res){
        const login = req.body;
        try{
            const result = await Login.criarLogin(login);
            res.status(200).json({message: "Login inserido com sucesso."});
        }
        catch(error){
            res.status(500).json({message: `Erro na requisição: ${error.message}`});
        }
    }

    static async alterarLogin(req, res){
        const username = req.params.username;
        const novosDados = req.body;
        try{
            const result = await Login.editarLogin(username, novosDados);
            res.status(200).json({message: "Login alterado com sucesso."});
        }
        catch(error){
            res.status(500).json({message: `Erro na requisição: ${error.message}`});
        }
    }

    static async removerLogin(req, res){
        const username = req.params.username;
        try{
            const result = await Login.excluirLogin(username);
            res.status(200).json({message: "Login removido com sucesso."});
        }
        catch(error){
            res.status(500).json({message: `Erro na requisição: ${error.message}`});
        }
    }
}

export default LoginController;