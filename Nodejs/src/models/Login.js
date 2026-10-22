import conectaBD from "../config/dbConect.js";
import bcrypt from 'bcrypt';

class Login{

    static async buscarTodos(){
        try{
            const conexao = await conectaBD();
            const result = await conexao.query(`SELECT * FROM resSalaLab.Login`);
            return result.recordset;
        }
        catch(error){
            throw new Error(`Falha na consulta ao BD: ${error.message}`);
        }
    }

    static async buscarPorUsername(username){
        try{
            const conexao = await conectaBD();
            const result = await conexao.query(`SELECT * FROM resSalaLab.Login WHERE username = ${username}`);
            return result.recordset;
        }
        catch(error){
            throw new Error(`Falha na consulta ao BD: ${error.message}`);
        }
    }

    static async buscarPorCpf(CPF){
        try{
            const conexao = await conectaBD();
            const result = await conexao.query(`SELECT * FROM resSalaLab.Login WHERE CPF = ${CPF}`);
            return result.recordset;
        }
        catch(error){
            throw new Error(`Falha na consulta ao BD: ${error.message}`);
        }
    }

    static async buscarPorDataCadastro(dataCadastro){
        try{
            const conexao = await conectaBD();
            const result = await conexao.query(`SELECT * FROM resSalaLab.Login WHERE dataCadastro = ${dataCadastro}`);
            return result.recordset;
        }
        catch(error){
            throw new Error(`Falha na consulta ao BD: ${error.message}`);
        }
    }

    static async criarLogin(loginNovo){
        const {CPF, username, senha} = loginNovo;
        const salt = await bcrypt.genSalt(10);
        const senhaHash = await bcrypt.hash(senha, salt);
        try{
            const conexao = await conectaBD();
            const result = await conexao.query(`INSERT INTO resSalaLab.Login (username, senha, CPF) VALUES (${username}, ${senhaHash}, ${CPF})`);
            return result;
        }
        catch(error){
            throw new Error(`Falha na criação do login no BD: ${error.message}`);
        }
    }
    
    static async editarLogin({CPF, novosDados}){
        const {username, senha} = novosDados;
        try{
            const conexao = await conectaBD();
            if (username == undefined){
                const salt = await bcrypt.genSalt(10);
                const senhaHash = await bcrypt.hash(senha, salt);
                const result = await conexao.query(`UPDATE resSalaLab.Login SET senha = ${senhaHash} WHERE CPF = ${CPF}`);
                return result;
            }
            else if (senha == undefined){
                const result = await conexao.query(`UPDATE resSalaLab.Login SET username = ${username} WHERE CPF = ${CPF}`);
                return result;
            }
            else {
                const salt = await bcrypt.genSalt(10);
                const senhaHash = await bcrypt.hash(senha, salt);
                const result = await conexao.query(`UPDATE resSalaLab.Login SET username = ${username}, senha = ${senhaHash} WHERE CPF = ${CPF}`);
                return result;
            }
        }
        catch(error){
            throw new Error(`Falha na edição do login no BD: ${error.message}`);
        }
    }
}

export default Login;