"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import style from "./frmNovaReserva.module.css"

type Predio = {
    idPredio: number;
    nome: string
}

type Ambiente = {
    idAmbiente: number;
    idPredio: number;
    nome: string;
    andar: number;
    capacidade: number;
    idTipo: number
}

type Reserva = {
    idReserva: number;
    idAmbiente: number;
    dataInicial: string;
    dataFinal: string;
    horarioInicial: string;
    horarioFinal: string;
};

type ConflitoInfo = {
    ambiente: string;
    dataInicial: string;
    dataFinal: string;
    horarioInicial: string;
    horarioFinal: string;
};

export default function frmNovaReserva(){
    const router = useRouter();
    const searchParams = useSearchParams();
    const idAmbienteParam = Number(searchParams.get("idAmbiente"));

    const [predios, setPredios] = useState<Predio[]>([]);
    const [idPredio, setIdPredio] = useState<number>();
    const [andar, setAndar] = useState<number>(0);
    const [ambientes, setAmbientes] = useState<Ambiente[]>([])
    const [idAmbiente, setIdAmbiente] = useState<number>();
    const [dataInicial, setDataInicial] = useState<string>();
    const [dataFinal, setDataFinal] = useState<string>();
    const [horarioInicial, setHorarioInicial] = useState<string>();
    const [horarioFinal, setHorarioFinal] = useState<string>();
    const [dataHora, setDataHora] = useState<{ data: string; hora: string }>();
    const [conflitoInfo, setConflitoInfo] = useState<ConflitoInfo | null>(null);

    useEffect(() => {
        async function listarPredios() {
            try{
                const response = await fetch("http://localhost:8080/predios");
                const dados = await response.json();
                setPredios(dados);
                if (dados.length > 0) setIdPredio(atual => atual ?? dados[0].idPredio);
            }
            catch(error){
                console.error("Erro ao acessar o BD", error);
            }
        }
        listarPredios();
    }, [])

    useEffect(() => {
        async function listarAmbientes() {
            try{
                const response = await fetch("http://localhost:8080/ambientes");
                const dados = await response.json();
                setAmbientes(dados);
            }
            catch(error){
                console.error("Erro ao acessar o BD", error);
            }
        }
        listarAmbientes();
    }, [])

    useEffect(() => {
        if (!idAmbienteParam || ambientes.length === 0) return;
        const amb = ambientes.find(a => a.idAmbiente === idAmbienteParam);
        if (amb) {
            setIdPredio(amb.idPredio);
            setAndar(amb.andar);
            setIdAmbiente(amb.idAmbiente);
        }
    }, [ambientes, idAmbienteParam]);

    async function reservar(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        const dados = {
            idReserva: 0,
            idAmbiente: idAmbiente,
            idStatus: 4,
            dataInicial: dataInicial,
            dataFinal: dataFinal,
            horarioInicial: horarioInicial,
            horarioFinal: horarioFinal
        }
        try{
            const responseReservas = await fetch("http://localhost:8080/reservas");
            const todasAsReservas: Reserva[] = await responseReservas.json();
            let conflito = false;
            let resConflito: Reserva = todasAsReservas[0];
            todasAsReservas.map(reserva => {
                if (reserva.idAmbiente == dados.idAmbiente){
                    if (reserva.dataInicial.slice(0, 10) <= dados.dataFinal! && reserva.dataFinal.slice(0, 10) >= dados.dataInicial!){
                        if (reserva.horarioInicial.slice(11, 16) < dados.horarioFinal! && reserva.horarioFinal.slice(11, 16) > dados.horarioInicial!){
                            conflito = true;
                            resConflito = reserva;
                        }
                    }
                }
            })

            if (conflito) {
                setConflitoInfo({
                    ambiente: ambientes.filter(res => res.idAmbiente == resConflito.idAmbiente)[0].nome,
                    dataInicial: resConflito.dataInicial.slice(0, 10),
                    dataFinal: resConflito.dataFinal.slice(0, 10),
                    horarioInicial: resConflito.horarioInicial.slice(11, 16),
                    horarioFinal: resConflito.horarioFinal.slice(11, 16),
                });
                return;
            }
            if (dados.dataInicial! < dataHora!.data) {
                alert("Data inicial inválida");
                return;
            }
            if (dados.dataInicial! === dataHora!.data && dados.horarioInicial! <= dataHora!.hora) {
                alert("Horário inicial inválido");
                return;
            }
            if (dados.dataFinal! < dados.dataInicial!) {
                alert("Data final inválida");
                return;
            }
            if (dados.horarioFinal! <= dados.horarioInicial!) {
                alert("Horário final deve ser maior que o inicial");
                return;
            }
            const response = await fetch("http://localhost:8080/reservas", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("loginToken")}`
                },
                body: JSON.stringify(dados),
            });
            if (response.ok) {
                router.push("/reservas");
            } else {
                alert("Erro ao adicionar reserva");
            }
        } catch (erro) {
            console.error("Erro ao adicionar reserva:", erro);
            alert("Erro ao adicionar reserva");
        }
    }
    
    useEffect(() => {
        async function buscarHorario() {
        try{
            const response = await fetch("http://localhost:8080/reservas/hora");
            if (!response.ok) {
                console.error("Erro ao buscar hora:", response.status, await response.text());
                return;
            }
            setDataHora(await response.json());
        } catch (erro) {
            console.error("Erro ao acessar Data e Hora do BD", erro);
        }
    }
        buscarHorario();
    }, [])

    return (
        <div className={style.body}>
            <form  onSubmit={reservar} className={style.form}>
                <h1>{dataHora ? `${dataHora.data.split("-").reverse().join("/")} ${dataHora.hora}` : ""}</h1>
                <div className={style.campos}>
                    <label>Prédio:</label>
                    <select
                        value={idPredio ?? ""}
                        onChange={p => {
                            setIdPredio(Number(p.target.value));
                            setIdAmbiente(undefined);
                        }}
                        required
                    >
                        {predios.map(predio => {
                            return <option key={predio.idPredio} value={predio.idPredio}>{predio.nome}</option>
                        })}
                    </select>
                </div>
                <div className={style.campos}>
                    <label>Andar:</label>
                    <input
                        type="number"
                        max={3}
                        min={-1}
                        value={andar}
                        onChange={a => {
                            setAndar(Number(a.target.value));
                            setIdAmbiente(undefined);
                        }}
                        required
                    ></input>
                </div>
                <div className={style.campos}>
                    <label>Ambiente:</label>
                    <select
                        value={idAmbiente ?? ""}
                        onChange={a => setIdAmbiente(a.target.value ? Number(a.target.value) : undefined)}
                        required
                    >
                        <option value="">Selecione...</option>
                        {ambientes.filter(a => a.idPredio === idPredio && a.andar === andar).map(a => (
                            <option key={a.idAmbiente} value={a.idAmbiente}>{a.nome}</option>
                        ))}
                    </select>
                </div>
                <div className={style.campos}>
                    <label>Data Inicial:</label>
                    <input type="date" onChange={d => setDataInicial(d.target.value)} required></input>
                </div>
                <div className={style.campos}>
                    <label>Data Final:</label>
                    <input type="date" onChange={d => setDataFinal(d.target.value)} required></input>
                </div>
                <div className={style.campos}>
                    <label>Horário Inicial:</label>
                    <input type="time" onChange={h => setHorarioInicial(h.target.value)} required></input>
                </div>
                <div className={style.campos}>
                    <label>Horário Final:</label>
                    <input type="time" onChange={h => setHorarioFinal(h.target.value)} required></input>
                </div>
                <div className={style.divButton}>
                    <button>Reservar</button>
                    <Link href="/reservas">Cancelar</Link>
                </div>
            </form>

            {conflitoInfo && (
                <div className={style.divPopUp} onClick={() => setConflitoInfo(null)}>
                    <div className={style.popUp} onClick={e => e.stopPropagation()}>
                        <h2><strong>Já existe uma reserva para {conflitoInfo.ambiente} nesse período:</strong></h2>
                        <p><strong>Data Inicial:</strong> {conflitoInfo.dataInicial.split("-").reverse().join("/")}</p>
                        <p><strong>Data Final:</strong> {conflitoInfo.dataFinal.split("-").reverse().join("/")}</p>
                        <p><strong>Horário Inicial:</strong> {conflitoInfo.horarioInicial}</p>
                        <p><strong>Horário Final:</strong> {conflitoInfo.horarioFinal}</p>
                        <button type="button" onClick={() => setConflitoInfo(null)} className={style.btnFechar}>Fechar</button>
                    </div>
                </div>
            )}
        </div>
    )
}