import conectaBD from "../config/dbConnect.js";

class Usuario {

    constructor(CPF, prenome, sobrenome, nascimento, celular, email) {
        this.CPF = CPF;
        this.prenome = prenome;
        this.sobrenome = sobrenome;
        this.nascimento = nascimento;
        this.celular = celular;
        this.email = email;
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

    static async buscarUsuarioPorId(idUsuario) {
        try {
            const conexao = await conectaBD();
            const result = await conexao.query(`SELECT * from resSalaLab.Usuario WHERE idUsuario=${idUsuario}`);
            return result.recordset
        }
        catch (error) {
            throw new Error(`Erro na consulta ao BD: ${error}`);
        }
    }

    static async removerUsuario(idUsuario) {
        try {
            const conexao = await conectaBD();
            const result = await conexao.query(`DELETE from resSalaLab.Usuario WHERE idUsuario=${idUsuario}`);
        }
        catch (error) {
            throw new Error(`Erro na remoção ao BD: ${error}`);
        }
    }

    static async inserirUsuario(Usuario){
        const { prenome, sobrenome, nascimento, celular, email } = Usuario;
        try {
            const conexao = await conectaBD();
            const result = await conexao.query(`INSERT into resSalaLab.Usuario (prenome, sobrenome, nascimento, celular, email) VALUES ('${prenome}', '${sobrenome}', '${nascimento}', '${celular}', '${email}')`);
            return result;
        }
        catch (error) {
            throw new Error(`Erro na inserção ao BD: ${error}`);
        }
    }

    static async alterarUsuario(Usuario) {
        const { CPF, prenome, sobrenome, nascimento, celular, email } = Usuario;
        try {
            const conexao = await conectaBD();
            const result = await conexao.query(`UPDATE resSalaLab.Usuario SET prenome='${prenome}', sobrenome=${sobrenome}, nascimento=${nascimento}, celular=${celular}, email=${email} WHERE CPF=${CPF}`);
            return result;
        }
        catch (error) {
            throw new Error(`Erro na alteração ao BD: ${error}`);
        }
    }
}
export default Usuario;