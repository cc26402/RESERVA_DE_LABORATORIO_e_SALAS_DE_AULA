"use client"
import { useState, useEffect } from "react";
import style from "./reservas.module.css";
import Tabela from "../../component/tabela";

type Reserva = {
    idReserva: number;
    username: string;
    idAmbiente: number; 
    idStatus: number; 
    dataInicial: string;
    dataFinal: string;
    horarioInicial: string;
    horarioFinal: string
};

type Form = {

};

export default function reservas(){
    const [reserva, setReserva] = useState<Reserva[]>;
    const [form, setForm] = useState<>

    useEffect(() => {
        async function listarReservasDoUsuario() {
            try{
                const response = await fetch("http://localhost:8080/reservas");
                const listaDeReservas = await response.json();
                setReserva(listaDeReservas);
            }
            catch(erro){
                throw new Error("falha ao conectar ao BD " + erro);
            }
        }
    }, [])

    return(
        <div>
            <header></header>
            <main>
                <Tabela titulos={["idReserva", "idAmbiente", "Status", "Data Inicial", "Data Final", "Horário Inicial", "Horario Final"]} listaOrdemChaveDados={["idReserva", "idAmbiente", "idStatus", "dataInicial", "dataFinal", "horarioInicial", "horarioFinal", "link", "botao"]} chavePrimaria={"idReserva"} dados={reserva} botoes={[{textoBotao: "Excluir", onClick: excluir}]} links={[{textoLink: "Editar", href: "/reservas", rotaDinamica: true}]}></Tabela>
            </main>
        </div>
    );
}