import conectaBD from "../config/dbConect.js";

class Ambiente{
    constructor (idAmbiente, nome, capacidade, idPredio, andar, idTipo){
        this.idAmbiente = idAmbiente;
        this.nome = nome;
        this.capacidade = capacidade;
        this.idPredio = idPredio;
        this.andar = andar;
        this.idTipo = idTipo;
    }

    static async buscarTodos(){
        try {
            const conexao = await conectaBD();
            const result = await conexao.query("SELECT * from resSalaLab.Ambiente");
            return result.recordset
        }
        catch (error) {
            throw new Error(`Erro na consulta ao BD: ${error}`);
        }
    }

    static async buscarAmbientePorId(idAmbiente) {
        try {
            const conexao = await conectaBD();
            const result = await conexao.query(`SELECT * from resSalaLab.Ambiente WHERE idAmbiente=${idAmbiente}`);
            return result.recordset
        }
        catch (error) {
            throw new Error(`Erro na consulta ao BD: ${error}`);
        }
    }

    static async removerAmbiente(idAmbiente) {
        try {
            const conexao = await conectaBD();
            const result = await conexao.query(`DELETE from resSalaLab.Ambiente WHERE idAmbiente=${idAmbiente}`);
        }
        catch (error) {
            throw new Error(`Erro na remoção ao BD: ${error}`);
        }
    }

    static async inserirAmbiente(Ambiente){
        const { nome, capacidade, idPredio, andar, idTipo } = Ambiente;
        try {
            const conexao = await conectaBD();
            const result = await conexao.query(`INSERT into resSalaLab.Ambiente (nome, capacidade, idPredio, andar, idTipo) VALUES ('${nome}', '${capacidade}', '${idPredio}', '${andar}', '${idTipo}')`);
            return result;
        }
        catch (error) {
            throw new Error(`Erro na inserção ao BD: ${error}`);
        }
    }

    static async alterarAmbiente(Ambiente) {
        const { idAmbiente, nome, capacidade, idPredio, andar, idTipo } = Ambiente;
        try {
            const conexao = await conectaBD();
            const result = await conexao.query(`UPDATE resSalaLab.Ambiente SET nome='${nome}', capacidade=${capacidade}, idPredio=${idPredio}, andar=${andar}, idTipo=${idTipo} WHERE idAmbiente=${idAmbiente}`);
            return result;
        }
        catch (error) {
            throw new Error(`Erro na alteração ao BD: ${error}`);
        }
    }
}
export default Ambiente;