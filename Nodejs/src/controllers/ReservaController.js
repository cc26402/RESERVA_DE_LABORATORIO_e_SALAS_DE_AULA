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