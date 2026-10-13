import Reserva from "../models/Reserva.js";

class ReservaController{

    static async listarReservas(req, res){
        try{
            const listarReservas = await Reserva.buscarTodos();  
            res.status(200).json(listarReservas);
        }
        catch(error){
            res.status(500).json({message: `${error} - falha na requisição`})
        }
    }

    static async listarReservasPorId(req, res){
        const idProcurado = req.params.id;
        try{
            const listarReservas = await Reserva.buscarReservaPorId(idProcurado);
            res.status(200).json(listarReservas);
        }
        catch(error){
            res.status(500).json({message: `${error} - falha na requisição`})
        }
    }

    static async listarReservasPorUsername(req, res){
        const username = req.params.username;
        try{
            const reservaUsername = await Reserva.buscarPorUsuario(username);
            res.status(200).json(reservaUsername);
        }
        catch(error){
            res.status(500).json({message: `Erro na requisição: ${error.message}`});
        }
    }

    static async listarReservasPorIdAmbiente(req, res){
        const idProcurado = req.params.id;
        try{
            const listarReservas = await Reserva.buscarReservaPorIdAmbiente(idProcurado);
            res.status(200).json(listarReservas);
        }
        catch(error){
            res.status(500).json({message: `${error} - falha na requisição`})
        }
    }

    static async listarReservasPorIdStatus(req, res){
        const idProcurado = req.params.id;
        try{
            const listarReservas = await Reserva.buscarReservaPorIdStatus(idProcurado);
            res.status(200).json(listarReservas);
        }
        catch(error){
            res.status(500).json({message: `${error} - falha na requisição`})
        }
    }

    static async listarReservasPorPeriodo(req, res){
        const dataInicial = req.params.dataInicial;
        const dataFinal = req.params.dataFinal;
        const horarioInicial = req.params.horarioInicial;
        const horarioFinal = req.params.horarioFinal;
        try{
            const reservaPeriodo = await Reserva.buscarReservaPorPeriodo(dataInicial, dataFinal, horarioInicial, horarioFinal);
            res.status(200).json(reservaPeriodo);
        }
        catch(error){
            res.status(500).json({message: `Erro na requisição: ${error.message}`});
        }
    }

    static async listarReservasPorData(req, res){
        const dataInicial = req.params.dataInicial;
        try{
            const reservaData = await Reserva.buscarReservaPorPeriodo(dataInicial);
            res.status(200).json(reservaData);
        }
        catch(error){
            res.status(500).json({message: `Erro na requisição: ${error.message}`});
        }
    }

    static async removerReserva(req,res){
        const idProcurado = req.params.id;
        try{
            const listarReservas = await Reserva.removerReserva(idProcurado);
            res.status(200).json({message: "Removido com sucesso"});
        }
        catch(error){
            res.status(500).json({message: `${error} - falha na requisição`})
        }
    }

    static async inserirReserva(req,res){
        const ReservaNova = req.body;
        try{
            const result = await Reserva.inserirReserva(ReservaNova);
            res.status(200).json({message: "Inserido com sucesso"});
        }
        catch(error){
            res.status(500).json({message: `${error} - falha na requisição`})
        }
    }

    static async alterarReserva(req, res){
        const idReserva = req.params.id;
        const { username, idAmbiente, idStatus, dataInicial, dataFinal, horarioInicial, horarioFinal } = req.body;
        try{
            const result = await Reserva.alterarReserva({idReserva: idReserva, username: username, idAmbiente: idAmbiente, idStatus: idStatus, dataInicial: dataInicial, dataFinal: dataFinal, horarioInicial: horarioInicial, horarioFinal: horarioFinal });
            res.status(200).json({message: "Alterado com sucesso"});
        }
        catch(error){
            res.status(500).json({message: `${error} - falha na requisição`})
        }   

    }
}
export default ReservaController;