import conectaBD from "../config/dbConect.js";

class Reserva {

    constructor(idReserva, username, idAmbiente, idStatus, dataInicial, dataFinal, horarioInicial, horarioFinal) {
        this.idReserva = idReserva;
        this.username = username;
        this.idAmbiente = idAmbiente;
        this.idStatus = idStatus;
        this.dataInicial = dataInicial;
        this.dataFinal = dataFinal;
        this.horarioInicial = horarioInicial;
        this.horarioFinal = horarioFinal;
    }

    static async buscarTodos(){
        try {
            const conexao = await conectaBD();
            const result = await conexao.query("SELECT * from resSalaLab.Reserva");
            return result.recordset
        }
        catch (error) {
            throw new Error(`Erro na consulta ao BD: ${error}`);
        }
    }

    static async buscarReservaPorId(idReserva) {
        try {
            const conexao = await conectaBD();
            const result = await conexao.query(`SELECT * from resSalaLab.Reserva WHERE idReserva='${idReserva}'`);
            return result.recordset
        }
        catch (error) {
            throw new Error(`Erro na consulta ao BD: ${error}`);
        }
    }

    static async removerReserva(idReserva) {
        try {
            const conexao = await conectaBD();
            const result = await conexao.query(`DELETE from resSalaLab.Reserva WHERE idReserva='${idReserva}'`);
        }
        catch (error) {
            throw new Error(`Erro na remoção ao BD: ${error}`);
        }
    }

    static async inserirReserva(Reserva){
        const { idReserva, username, idAmbiente, idStatus, dataInicial, dataFinal, horarioInicial, horarioFinal } = Reserva;
        try {
            const conexao = await conectaBD();
            const result = await conexao.query(`INSERT into resSalaLab.Reserva (idReserva, username, idAmbiente, idStatus, dataInicial, dataFinal, horarioInicial, horarioFinal) VALUES ('${idReserva}', '${username}', '${idAmbiente}', '${idStatus}', '${dataInicial}', '${dataFinal}', '${horarioInicial}', '${horarioFinal}')`);
            return result;
        }
        catch (error) {
            throw new Error(`Erro na inserção ao BD: ${error}`);
        }
    }

    static async alterarReserva(Reserva) {
        const { idReserva, username, idAmbiente, idStatus, dataInicial, dataFinal, horarioInicial, horarioFinal } = Reserva;
        try {
            const conexao = await conectaBD();
            const result = await conexao.query(`UPDATE resSalaLab.Reserva SET username='${username}', idAmbiente='${idAmbiente}', idStatus='${idStatus}', dataInicial='${dataInicial}', dataFinal='${dataFinal}', horarioInicial='${horarioInicial}', horarioFinal='${horarioFinal}' WHERE idReserva='${idReserva}'`);
            return result;
        }
        catch (error) {
            throw new Error(`Erro na alteração ao BD: ${error}`);
        }
    }
}
export default Reserva;