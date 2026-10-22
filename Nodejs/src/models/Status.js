import conectaBD from "../config/dbConect.js"
export class Status {
    constructor(idStatus, nome){
        this.idStatus = idStatus;
        this.nome = nome;
    }

    static async buscarTodos(){
        try {
            const conexao = await conectaBD();
            const result = await conexao.query`SELECT * from resSalaLab.Status`;
            return result.recordset
        }
        catch (error) {
            throw new Error(`Erro na consulta ao BD: ${error}`);
        }
    }
}

export default Status;