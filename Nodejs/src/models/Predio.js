import conectaBD from "../config/dbConect.js";

class Predio {

    constructor(idPredio, nome) {
        this.idPredio = idPredio;
        this.nome = nome;
    }

    static async buscarTodos(){
        try {
            const conexao = await conectaBD();
            const result = await conexao.query("SELECT * from resSalaLab.Predio");
            return result.recordset
        }
        catch (error) {
            throw new Error(`Erro na consulta ao BD: ${error}`);
        }
    }

    static async buscarPredioPorId(idPredio) {
        try {
            const conexao = await conectaBD();
            const result = await conexao.query(`SELECT * from resSalaLab.Predio WHERE idPredio='${idPredio}'`);
            return result.recordset
        }
        catch (error) {
            throw new Error(`Erro na consulta ao BD: ${error}`);
        }
    }

    static async removerPredio(idPredio) {
        try {
            const conexao = await conectaBD();
            const result = await conexao.query(`DELETE from resSalaLab.Predio WHERE idPredio='${idPredio}'`);
        }
        catch (error) {
            throw new Error(`Erro na remoção ao BD: ${error}`);
        }
    }

    static async inserirPredio(Predio){
        const { idPredio, nome } = Predio;
        try {
            const conexao = await conectaBD();
            const result = await conexao.query(`INSERT into resSalaLab.Predio (idPredio, nome) VALUES ('${idPredio}', '${nome}')`);
            return result;
        }
        catch (error) {
            throw new Error(`Erro na inserção ao BD: ${error}`);
        }
    }

    static async alterarPredio(Predio) {
        const { idPredio, nome } = Predio;
        try {
            const conexao = await conectaBD();
            const result = await conexao.query(`UPDATE resSalaLab.Predio SET nome='${nome}' WHERE idPredio='${idPredio}'`);
            return result;
        }
        catch (error) {
            throw new Error(`Erro na alteração ao BD: ${error}`);
        }
    }
}
export default Predio;