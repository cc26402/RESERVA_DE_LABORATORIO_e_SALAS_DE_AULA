import { use } from "react";
import conectaBD from "../config/dbConnect.js";

class Reserva{
    constructor (idReserva, username, idAmbiente, idStatus, dataInicial, dataFinal, horarioInicial, horarioFinal){
        this.idReserva = idReserva;
        this.username = username;
        this.idAmbiente = idAmbiente;
        this.idStatus = idStatus;
        this.dataInicial = dataInicial;
        this.dataFinal = dataFinal;
        this.horarioInicial = horarioInicial;
        this.horarioFinal = horarioFinal;
    }

    static async 

}