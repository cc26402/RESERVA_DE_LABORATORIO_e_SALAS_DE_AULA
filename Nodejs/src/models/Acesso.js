import conectaBD from "../config/dbConect.js"

class Acesso{
    static tabelaAcesso = "resSalaLab.Acesso";

    constructor (idAcesso, username){
        this.idAcesso = idAcesso;
        this.username = username;
        this.dataHoraAcesso = new Date().toISOString()
    }

    static async buscarTodos(){
        try{
            const conexao = await conectaBD();
            const result = await conexao.query(`SELECT * FROM ${tabelaAcesso}`);
            return result.recordset
        }
        catch(error){
            throw new Error(`Erro na consulta ao BD: ${error}`)
        }
    }

    static async buscaPorId(idAcesso){
        try{
            const conexao = await conectaBD();
            const result = await conexao.query(`SELECT * FROM ${tabelaAcesso} WHERE idAcesso = ${idAcesso}`);
            return result.recordset
        }
        catch(error){
            throw new Error(`Erro na consulta ao BD: ${error}`)
        }
    }

    static async buscaPorUsername(username){
        try{
            const conexao = await conectaBD();
            const result = await conexao.request()
            .input('username', conexao.VarChar, username)
            .query(`SELECT * FROM ${tabelaAcesso} WHERE username = @username`);
            return result.recordset;
        }
        catch(error){
            throw new Error(`Erro na consulta ao BD: ${error}`)
        }
    }

    static async buscaPorUsernameNaData(username, dataAcesso){
        try{
            const conexao = await conectaBD();
            const result = await conexao.request()
            .input('username', conexao.VarChar, username)
            .input('dataAcessoInicio', conexao.DateTime2, `${dataAcesso} 00:00:00`)
            .input('dataAcessoFim', conexao.DateTime2, `${dataAcesso} 23:59:59.999`)
            .query(`SELECT * FROM ${tabelaAcesso} WHERE username = @username AND dataHoraAcesso >= @dataAcessoInicio AND dataHoraAcesso<= @dataAcessoFim`);
            return result.recordset
        }
        catch(error){
            throw new Error(`Erro na consulta ao BD: ${error}`);
        }
    }
}