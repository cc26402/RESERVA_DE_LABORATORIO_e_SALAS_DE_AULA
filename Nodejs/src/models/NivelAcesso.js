import conectaBD from "../config/dbConect.js";

export default class Acesso{

    static async buscarTodos(){
        try{
            const conexao = await conectaBD();
            const result = await conexao.query(`SELECT * FROM resSalaLab.Nivel_Acesso`);
            return result.recordset
        }
        catch(error){
            throw new Error(`Erro na consulta ao BD: ${error}`)
        }
    }

    static async buscarPorId(id){
        try{
            const conexao = await conectaBD();
            const result = await conexao.query`SELECT * FROM resSalaLab.Nivel_Acesso WHERE idNivelAcesso=${id}`;
            return result.recordset
        }
        catch(error){
            throw new Error(`Erro na consulta ao BD: ${error}`)
        }
    }
}