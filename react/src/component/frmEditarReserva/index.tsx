"use client"
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";

type Reserva = {
    idReserva: number;
    username: string;
    idAmbiente: number;
    idStatus: number;
    dataInicial: string;
    dataFinal: string;
    horarioInicial: string;
    horarioFinal: string;
};

type Ambiente = {
    idAmbiente: number;
    idPredio: number;
    nome: string;
    capacidade: number;
    andar: number;
    idTipo: number;
};

type Predio = {
    idPredio: number;
    nome: string;
};

type DataHora = {
    data: string;
    hora: string
}

export function FrmEditarReserva({ idReserva }: { idReserva: string }){

    const [reservaSelecionada, setReservaSelecionada] = useState<Reserva>();
    const [reservas, setReservas] = useState<Reserva[]>([]);
    const [ambientes, setAmbientes] = useState<Ambiente[]>([]);
    const [predios, setPredios] = useState<Predio[]>([]);
    const [predioSelect, setPredioSelect] = useState<number>();
    const [andarSelect, setAndarSelect] = useState<number>(0);
    const [dataInicialInput, setDataInicialInput] = useState<string>()
    const [reservaEditada, setReservaEditada] = useState<Reserva>();
    const [dataHora, setDataHora] = useState<DataHora>();

    useEffect(() => {
        async function buscarReservaPorId() {
            try{
                const response = await fetch("http://localhost:8080/reservas/" + idReserva);
                const dados: Reserva = await response.json();
                if (!response.ok) throw new Error("Falha ao buscar dados do BD");
                setReservaSelecionada(dados);
                setReservaEditada(dados);
            } catch(erro){
                throw new Error("Falha ao buscar dados do BD," + erro);
            }
        }
        buscarReservaPorId();
    }, [])
    
    useEffect(() => {
        async function buscarReservas() {
            try{
                const response = await fetch("http://localhost:8080/reservas");
                const dados: Reserva[] = await response.json();
                if (!response.ok) throw new Error("Falha ao buscar dados do BD");
                setReservas(dados);
            } catch(erro){
                throw new Error("Falha ao buscar dados do BD," + erro);
            }
        }
        buscarReservas();
    }, [])

    useEffect(() => {
        async function buscarPredios() {
            try{
                const response = await fetch("http://localhost:8080/predios");
                const dados: Predio[] = await response.json();
                if (!response.ok) throw new Error("Falha ao buscar dados do BD");
                setPredios(dados);
                setPredioSelect(Number(dados[0].idPredio));
            } catch(erro){
                throw new Error("Falha ao buscar dados do BD," + erro)
            }
        }
        buscarPredios();
    }, [])

    useEffect(() => {
        async function buscarAmbientes() {
            try{
                const response = await fetch("http://localhost:8080/ambientes");
                const dados: Ambiente[] = await response.json();
                if (!response.ok) throw new Error("Falha ao buscar dados do BD");
                setAmbientes(dados);
            } catch(erro){
                throw new Error("Falha ao buscar dados do BD," + erro)
            }
        }
        buscarAmbientes();
    }, [])

    useEffect(() => {
        async function buscarDataHora() {
            try{
                const response = await fetch("http://localhost:8080/reservas/hora");
                const dados: DataHora = await response.json();
                setDataHora(dados);
            } catch(erro){
                throw new Error("Falha ao buscar dados do BD," + erro)
            }
        }
        buscarDataHora(); 
    }, [])

    const handlePredio = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPredioSelect(Number(e.target.value));
    }

    const handleAndar = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAndarSelect(Number(e.target.value));
    }

    const handleDataInicial = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDataInicialInput(String(e.target.value));
    }

    const handleSubmit = (e: React.ChangeEvent<SubmitEvent>) => {
        e.preventDefault();
        try{
            const response = await fetch("http:/localhost:8080/reservas", {
                method : 'PATCH',
                headers : { 'Content-Type' : 'application/json' },
                body: JSON.stringify(reservaEditada)
            })
        } catch(erro){

        }
    }

    return(
        <form onSubmit={handleSubmit}>
            <h1>Editar Reserva</h1>
            <h2>{dataHora ? `${dataHora.data.split("-").reverse().join("/")} ${dataHora.hora}` : ""}</h2>
            <div>
                <label>Prédio</label>
                <select onChange={handlePredio}>
                    {
                        predios.map(p => {
                            return(
                                <option key={p.idPredio} value={p.idPredio}>{p.nome}</option>
                            )
                        })
                    }
                </select>
            </div>
            <div>
                <label>Andar</label>
                <input type="number" max={3} min={-1} defaultValue={0} onChange={handleAndar}></input>
            </div>
            <div>
                <label>Ambiente</label>
                <select>
                    {
                        ambientes.map(amb => {
                            if (amb.idPredio == predioSelect && amb.andar == andarSelect){
                                return (
                                    <option value={amb.idPredio}>{amb.nome}</option>
                                )
                            }
                        })
                        
                    }
                </select>
            </div>
            <div>
                <label>Data Inicial</label>
                <input type="date" onChange={}></input>
            </div>
            <div>
                <label>Data Final</label>
                <input type="date"></input>
            </div>
            <div>
                <label>Horário Inicial</label>
                <input type="time"></input>
            </div>
            <div>
                <label>Horário Final</label>
                <input type="time"></input>
            </div>
            <div>
                <button>Confirmar</button>
                <Link href={"/reservas"}>Cancelar</Link>
            </div>
        </form>
    )
}