"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import style from "./frmEditarReserva.module.css"

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

    const [reserva, setReserva] = useState<Reserva>();
    const [erro, setErro] = useState<string>();

    useEffect(() => {
        async function buscarReserva() {
            try{
                const response = await fetch("http://localhost:8080/reservas/" + idReserva, {
                    headers: { "Authorization": `Bearer ${localStorage.getItem("loginToken")}` }
                });
                if (!response.ok) throw new Error("Falha ao buscar a reserva");
                const lista: Reserva[] = await response.json();
                const dados = lista[0];
                if (!dados) throw new Error("Reserva não encontrada");
                setReserva({
                    ...dados,
                    dataInicial: dados.dataInicial.slice(0, 10),
                    dataFinal: dados.dataFinal.slice(0, 10),
                    horarioInicial: dados.horarioInicial.slice(11, 16),
                    horarioFinal: dados.horarioFinal.slice(11, 16),
                });
            } catch(e){
                console.error(e);
                setErro("Não foi possível carregar a reserva.");
            }
        }
        buscarReserva();
    }, [idReserva])

    if (erro) return <p>{erro}</p>;
    if (!reserva) return <p>Carregando...</p>;
    return <FormularioReserva reserva={reserva} />;
}

function FormularioReserva({ reserva }: { reserva: Reserva }){

    const router = useRouter();
    const [reservas, setReservas] = useState<Reserva[]>([]);
    const [ambientes, setAmbientes] = useState<Ambiente[]>([]);
    const [predios, setPredios] = useState<Predio[]>([]);
    const [predioSelect, setPredioSelect] = useState<number>();
    const [andarSelect, setAndarSelect] = useState<number>(0);
    const [reservaEditada, setReservaEditada] = useState<Reserva>(reserva);
    const [dataHora, setDataHora] = useState<DataHora>();

    useEffect(() => {
        async function buscarReservas() {
            try{
                const response = await fetch("http://localhost:8080/reservas", {
                    headers: { "Authorization": `Bearer ${localStorage.getItem("loginToken")}` }
                });
                if (!response.ok) throw new Error("Falha ao buscar reservas");
                const dados: Reserva[] = await response.json();
                setReservas(dados);
            } catch(erro){
                console.error(erro);
            }
        }
        buscarReservas();
    }, [])

    useEffect(() => {
        async function buscarPredios() {
            try{
                const response = await fetch("http://localhost:8080/predios");
                if (!response.ok) throw new Error("Falha ao buscar prédios");
                const dados: Predio[] = await response.json();
                setPredios(dados);
            } catch(erro){
                console.error(erro);
            }
        }
        buscarPredios();
    }, [])

    useEffect(() => {
        async function buscarAmbientes() {
            try{
                const response = await fetch("http://localhost:8080/ambientes");
                if (!response.ok) throw new Error("Falha ao buscar ambientes");
                const dados: Ambiente[] = await response.json();
                setAmbientes(dados);
            } catch(erro){
                console.error(erro);
            }
        }
        buscarAmbientes();
    }, [])

    useEffect(() => {
        async function buscarDataHora() {
            try{
                const response = await fetch("http://localhost:8080/reservas/hora");
                if (!response.ok) throw new Error("Falha ao buscar data e hora");
                const dados: DataHora = await response.json();
                setDataHora(dados);
            } catch(erro){
                console.error(erro);
            }
        }
        buscarDataHora();
    }, [])

    useEffect(() => {
        const ambienteAtual = ambientes.find(amb => amb.idAmbiente === reserva.idAmbiente);
        if (ambienteAtual) {
            setPredioSelect(ambienteAtual.idPredio);
            setAndarSelect(ambienteAtual.andar);
        }
    }, [ambientes, reserva.idAmbiente])

    function haReservaComConflito(): boolean {
        const novoInicio = reservaEditada.dataInicial + " " + reservaEditada.horarioInicial;
        const novoFim = reservaEditada.dataFinal + " " + reservaEditada.horarioFinal;

        return reservas.some(r => {
            if (r.idReserva === reserva.idReserva) return false;
            if (r.idAmbiente !== reservaEditada.idAmbiente) return false;
            const inicio = r.dataInicial.slice(0, 10) + " " + r.horarioInicial.slice(11, 16);
            const fim = r.dataFinal.slice(0, 10) + " " + r.horarioFinal.slice(11, 16);
            return novoInicio < fim && novoFim > inicio;
        });
    }

    const ambientesFiltrados = ambientes.filter(
        amb => amb.idPredio === predioSelect && amb.andar === andarSelect
    );

    const ambienteValido = ambientesFiltrados.some(
        amb => amb.idAmbiente === reservaEditada.idAmbiente
    );

    function selecionarPrimeiroAmbiente(idPredio: number | undefined, andar: number) {
        const primeiro = ambientes.find(amb => amb.idPredio === idPredio && amb.andar === andar);
        if (primeiro) {
            setReservaEditada(res => ({ ...res, idAmbiente: primeiro.idAmbiente }));
        }
    }

    const handlePredio = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const novoPredio = Number(e.target.value);
        setPredioSelect(novoPredio);
        selecionarPrimeiroAmbiente(novoPredio, andarSelect);
    }

    const handleAndar = (e: React.ChangeEvent<HTMLInputElement>) => {
        const novoAndar = Number(e.target.value);
        setAndarSelect(novoAndar);
        selecionarPrimeiroAmbiente(predioSelect, novoAndar);
    }

    const handleAmbiente = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setReservaEditada(res => ({ ...res, idAmbiente: Number(e.target.value) }));
    }

    const handleDataInicial = (e: React.ChangeEvent<HTMLInputElement>) => {
        setReservaEditada(res => ({ ...res, dataInicial: e.target.value }));
    }

    const handleDataFinal = (e: React.ChangeEvent<HTMLInputElement>) => {
        setReservaEditada(res => ({ ...res, dataFinal: e.target.value }));
    }

    const handleHorarioInicial = (e: React.ChangeEvent<HTMLInputElement>) => {
        setReservaEditada(res => ({ ...res, horarioInicial: e.target.value }));
    }

    const handleHorarioFinal = (e: React.ChangeEvent<HTMLInputElement>) => {
        setReservaEditada(res => ({ ...res, horarioFinal: e.target.value }));
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!dataHora) return;

        const hoje = dataHora.data.slice(0, 10);
        const agora = dataHora.hora.slice(0, 5);
        const novoInicio = reservaEditada.dataInicial + " " + reservaEditada.horarioInicial;
        const novoFim = reservaEditada.dataFinal + " " + reservaEditada.horarioFinal;

        if (reservaEditada.dataInicial < hoje) {
            alert("DATA INICIAL INVÁLIDA");
            return;
        }
        if (reservaEditada.dataInicial === hoje && reservaEditada.horarioInicial < agora) {
            alert("HORÁRIO INICIAL INVÁLIDO");
            return;
        }
        if (novoFim <= novoInicio) {
            alert("O FIM DEVE SER DEPOIS DO INÍCIO");
            return;
        }
        if (haReservaComConflito()) {
            alert("PERÍODO INDISPONÍVEL");
            return;
        }

        try{
            const response = await fetch("http://localhost:8080/reservas/" + reserva.idReserva, {
                method : 'PATCH',
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${localStorage.getItem("loginToken")}`
                },
                body: JSON.stringify(reservaEditada)
            })
            if (!response.ok){
                throw new Error("Falha ao atualizar a reserva");
            }
            router.push("/reservas");
        } catch(erro){
            console.error(erro);
        }
    }

    return(
        <div className={style.body}>
            <form onSubmit={handleSubmit} className={style.form}>
                <h1>Edição de Reserva</h1>
                <div className={style.campos}>
                    <label>Prédio</label>
                    <select value={predioSelect ?? ""} onChange={handlePredio}>
                        {
                            predios.map(p => (
                                <option key={p.idPredio} value={p.idPredio}>{p.nome}</option>
                            ))
                        }
                    </select>
                </div>
                <div className={style.campos}>
                    <label>Andar</label>
                    <input type="number" max={3} min={-1} value={andarSelect} onChange={handleAndar} />
                </div>
                <div className={style.campos}>
                    <label>Ambiente</label>
                    <select value={reservaEditada.idAmbiente} onChange={handleAmbiente}>
                        {
                            ambientesFiltrados.map(amb => (
                                <option key={amb.idAmbiente} value={amb.idAmbiente}>{amb.nome}</option>
                            ))
                        }
                    </select>
                </div>
                <div className={style.campos}>
                    <label>Data Inicial</label>
                    <input type="date" value={reservaEditada.dataInicial} onChange={handleDataInicial} />
                </div>
                <div className={style.campos}>
                    <label>Data Final</label>
                    <input type="date" value={reservaEditada.dataFinal} onChange={handleDataFinal} />
                </div>
                <div className={style.campos}>
                    <label>Horário Inicial</label>
                    <input type="time" value={reservaEditada.horarioInicial} onChange={handleHorarioInicial} />
                </div>
                <div className={style.campos}>
                    <label>Horário Final</label>
                    <input type="time" value={reservaEditada.horarioFinal} onChange={handleHorarioFinal} />
                </div>
                <div className={style.divButton}>
                    <button type="submit" disabled={!ambienteValido}>Confirmar</button>
                    <Link href={"/reservas"}>Cancelar</Link>
                </div>
            </form>
        </div>
    )
}