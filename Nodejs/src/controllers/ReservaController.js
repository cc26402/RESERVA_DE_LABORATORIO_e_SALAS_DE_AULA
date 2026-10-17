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

    static async listarMinhasReservas(req, res){
        try{
            const reservas = await Reserva.buscarPorUsuario(req.username);
            res.status(200).json(reservas);
        }
        catch(error){
            res.status(500).json({message: `Erro na requisição: ${error.message}`});
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
        const idProcurado = req.params.idAmbiente;
        try{
            const listarReservas = await Reserva.buscarReservaPorIdAmbiente(idProcurado);
            res.status(200).json(listarReservas);
        }
        catch(error){
            res.status(500).json({message: `${error} - falha na requisição`})
        }
    }

    static async listarReservasPorIdStatus(req, res){
        const idProcurado = req.params.idStatus;
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
            const reservaPeriodo = await Reserva.buscarReservaPorPeriodo({dataInicial, dataFinal, horarioInicial, horarioFinal});
            res.status(200).json(reservaPeriodo);
        }
        catch(error){
            res.status(500).json({message: `Erro na requisição: ${error.message}`});
        }
    }

    static async listarReservasPorData(req, res){
        const dataInicial = req.params.dataInicial;
        try{
            const reservaData = await Reserva.buscarReservaPorPeriodo({dataInicial});
            res.status(200).json(reservaData);
        }
        catch(error){
            res.status(500).json({message: `Erro na requisição: ${error.message}`});
        }
    }

    static async removerReserva(req,res){
        const idProcurado = req.params.id;
        try{
            const [reserva] = await Reserva.buscarReservaPorId(idProcurado);
            if (!reserva) return res.status(404).json({message: "Reserva não encontrada."});
            if (reserva.username !== req.username) {
                return res.status(403).json({message: "Você não pode remover a reserva de outro usuário."});
            }

            const listarReservas = await Reserva.removerReserva(idProcurado);
            res.status(200).json({message: "Removido com sucesso"});
        }
        catch(error){
            res.status(500).json({message: `${error} - falha na requisição`})
        }
    }

    static async inserirReserva(req,res){
        const ReservaNova = { ...req.body, username: req.username };
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
        const { idAmbiente, idStatus, dataInicial, dataFinal, horarioInicial, horarioFinal } = req.body;
        try{
            const [reserva] = await Reserva.buscarReservaPorId(idReserva);
            if (!reserva) return res.status(404).json({message: "Reserva não encontrada."});
            if (reserva.username !== req.username) {
                return res.status(403).json({message: "Você não pode alterar a reserva de outro usuário."});
            }

            const result = await Reserva.alterarReserva({idReserva: idReserva, username: req.username, idAmbiente: idAmbiente, idStatus: idStatus, dataInicial: dataInicial, dataFinal: dataFinal, horarioInicial: horarioInicial, horarioFinal: horarioFinal });
            res.status(200).json({message: "Alterado com sucesso"});
        }
        catch(error){
            res.status(500).json({message: `${error} - falha na requisição`})
        }
    }

    static async horaAtual(req, res){
        try{
            res.status(200).json(await Reserva.horaAtual());
        }
        catch(error){
            res.status(500).json({message: `${error} - falha na requisição`});
        }
    }
}
export default ReservaController;