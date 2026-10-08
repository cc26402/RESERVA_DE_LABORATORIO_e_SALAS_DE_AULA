import conectaBD from "../config/dbConect.js";
import Login from "./Login.js";

class Usuario {

    constructor(CPF, prenome, sobrenome, nascimento, celular, email, idNivelAcesso) {
        this.CPF = CPF;
        this.prenome = prenome;
        this.sobrenome = sobrenome;
        this.nascimento = nascimento;
        this.celular = celular;
        this.email = email;
        this.idNivelAcesso = idNivelAcesso;
    }

    static async buscarTodos(){
        try {
            const conexao = await conectaBD();
            const result = await conexao.query("SELECT * from resSalaLab.Usuario");
            return result.recordset
        }
        catch (error) {
            throw new Error(`Erro na consulta ao BD: ${error}`);
        }
    }

    static async buscarUsuarioPorCPF(CPF) {
        try {
            const conexao = await conectaBD();
            const result = await conexao.query(`SELECT * from resSalaLab.Usuario WHERE CPF='${CPF}'`);
            return result.recordset
        }
        catch (error) {
            throw new Error(`Erro na consulta ao BD: ${error}`);
        }
    }

    static async removerUsuario(CPF) {
        try {
            const conexao = await conectaBD();
            const result = await conexao.query(`DELETE from resSalaLab.Usuario WHERE CPF='${CPF}'`);
        }
        catch (error) {
            throw new Error(`Erro na remoção ao BD: ${error}`);
        }
    }

    static async inserirUsuario(Usuario){
        const { CPF, prenome, sobrenome, nascimento, celular, email, idNivelAcesso, senha } = Usuario;
        const LoginNovo = {CPF: CPF, username: email, senha: senha}
        try {
            const conexao = await conectaBD();
            const result = await conexao.query(`INSERT into resSalaLab.Usuario (CPF, prenome, sobrenome, nascimento, celular, email, idNivelAcesso) VALUES ('${CPF}', '${prenome}', '${sobrenome}', '${nascimento}', '${celular}', '${email}', '${idNivelAcesso}')`);
            Login.criarLogin(LoginNovo);
            return result;
        }
        catch (error) {
            throw new Error(`Erro na inserção ao BD: ${error}`);
        }
    }

    static async alterarUsuario(Usuario) {
        const { CPF, prenome, sobrenome, nascimento, celular, email, idNivelAcesso } = Usuario;
        try {
            const conexao = await conectaBD();
            const result = await conexao.query(`UPDATE resSalaLab.Usuario SET prenome='${prenome}', sobrenome='${sobrenome}', nascimento='${nascimento}', celular='${celular}', email='${email}', idNivelAcesso='${idNivelAcesso}' WHERE CPF='${CPF}'`);
            Login.editarLogin({CPF, novosDados: {username: email}});
            return result;
        }
        catch (error) {
            throw new Error(`Erro na alteração ao BD: ${error}`);
        }
    }
}
export default Usuario;