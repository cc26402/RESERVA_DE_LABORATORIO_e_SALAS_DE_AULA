import conectaBD from "../config/dbConect.js"

class Acesso{

    constructor (idAcesso, username){
        this.idAcesso = idAcesso;
        this.username = username;
        this.dataHoraAcesso = new Date().toISOString()
    }

    static async buscarTodos(){
        try{
            const conexao = await conectaBD();
            const result = await conexao.query(`SELECT * FROM resSalaLab.Acesso`);
            return result.recordset
        }
        catch(error){
            throw new Error(`Erro na consulta ao BD: ${error}`)
        }
    }

    static async buscaPorId(idAcesso){
        try{
            const conexao = await conectaBD();
            const result = await conexao.query`SELECT * FROM resSalaLab.Acesso WHERE idAcesso = ${idAcesso}`;
            return result.recordset
        }
        catch(error){
            throw new Error(`Erro na consulta ao BD: ${error}`)
        }
    }

    static async buscaPorUsername(username){
        try{
            const conexao = await conectaBD();
            const result = await conexao.query`SELECT * FROM resSalaLab.Acesso WHERE username = ${username}`;
            return result.recordset;
        }
        catch(error){
            throw new Error(`Erro na consulta ao BD: ${error}`)
        }
    }
    
    static async buscaPorPeriodoEUsuario({dataInicio, dataFim=dataInicio, horaInicio='00:00:00', horaFim='23:59:59.999', username=null}){
        try{
            const conexao = await conectaBD();
            const inicioDataHora = `${dataInicio} ${horaInicio}`;
            const fimDataHora = `${dataFim} ${horaFim}`;
            if (username!=null){
                const result = await conexao.query`SELECT * FROM resSalaLab.Acesso WHERE username = ${username} AND dataHoraAcesso >= ${inicioDataHora} AND dataHoraAcesso<=${fimDataHora}`
                return result.recordset
            }
            else {
                const result = await conexao.query`SELECT * FROM resSalaLab.Acesso WHERE dataHoraAcesso >= ${inicioDataHora} AND dataHoraAcesso<=${fimDataHora}`
                return result.recordset

            }
        }
        catch(error){
            throw new Error(`Erro na consulta ao BD: ${error}`);
        }
    }

    static async inserirRegistroDeAcesso(acesso){
        const {username} = acesso
        try{
            const conexao = await conectaBD();
            const result = await conexao.query`INSERT INTO resSalaLab.Acesso (username) values (${username})`;
            return result;
        }
        catch(error){
            throw new Error(`Erro na criação do registro de acesso no BD: ${error}`);
        }
    }
}

export default Acesso;