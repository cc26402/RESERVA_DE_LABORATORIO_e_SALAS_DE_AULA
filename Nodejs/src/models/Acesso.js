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
    
    static async buscaPorPeriodoEUsuario(dataAcessoInicio, dataAcessoFim=dataAcessoInicio, horaAcessoInicio='00:00:00', horaAcessoFim='23:59:59.999', username=null){
        try{
            const conexao = await conectaBD();
            const inicioDataHora = `${dataAcessoInicio} ${horaAcessoInicio}`;
            const fimDataHora = `${dataAcessoFim} ${horaAcessoFim}`;
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

}

export default Acesso;