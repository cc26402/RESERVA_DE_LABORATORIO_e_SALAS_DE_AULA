"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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

export default function frmNovaReserva(){
    const router = useRouter();
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

    useEffect(() => {
        async function listarPredios() {
            try{
                const response = await fetch("http://localhost:8080/predios");
                const dados = await response.json();
                setPredios(dados);
                if (dados.length > 0) setIdPredio(dados[0].idPredio);
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
            todasAsReservas.map(reserva => {
                if (reserva.idAmbiente == dados.idAmbiente){
                    if (reserva.dataInicial.slice(0, 10) <= dados.dataFinal! && reserva.dataFinal.slice(0, 10) >= dados.dataInicial!){
                        if (reserva.horarioInicial.slice(11, 16) < dados.horarioFinal! && reserva.horarioFinal.slice(11, 16) > dados.horarioInicial!){
                            conflito = true;
                        }
                    }
                }
            })

            if (conflito) {
                alert("HORÁRIO INDISPONÍVEL");
                return
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
        <form  onSubmit={reservar}>
            <h1>{dataHora ? `${dataHora.data.split("-").reverse().join("/")} ${dataHora.hora}` : ""}</h1>
            <div>
                <label>Prédio:</label>
                <select onChange={p => setIdPredio(Number(p.target.value))} required>
                    {predios.map(predio => {
                        return <option key={predio.idPredio} value={predio.idPredio}>{predio.nome}</option>
                    })}
                </select>
            </div>
            <div>
                <label>Andar:</label>
                <input type="number" max={3} min={-1} defaultValue={0} onChange={a => setAndar(Number(a.target.value))} required></input>
            </div>
            <div>
                <label>Ambiente:</label>
                <select onChange={a => setIdAmbiente(Number(a.target.value))} required>
                    <option value="">Selecione...</option>
                    {ambientes.filter(a => a.idPredio === idPredio && a.andar === andar).map(a => (
                        <option key={a.idAmbiente} value={a.idAmbiente}>{a.nome}</option>
                    ))}
                </select>
            </div>
            <div>
                <label>Data Inicial:</label>
                <input type="date" onChange={d => setDataInicial(d.target.value)} required></input>
            </div>
            <div>
                <label>Data Final:</label>
                <input type="date" onChange={d => setDataFinal(d.target.value)} required></input>
            </div>
            <div>
                <label>Horário Inicial:</label>
                <input type="time" onChange={h => setHorarioInicial(h.target.value)} required></input>
            </div>
            <div>
                <label>Horário Final:</label>
                <input type="time" onChange={h => setHorarioFinal(h.target.value)} required></input>
            </div>
            <div>
                <button>Reservar</button>
                <Link href="/reservas">Cancelar</Link>
            </div>
        </form>
    )
}