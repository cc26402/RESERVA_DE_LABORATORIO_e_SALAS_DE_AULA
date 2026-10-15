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

export default function frmNovaReserva(){
    const router = useRouter();
    const [username, setUsername] = useState<string>();
    const [predios, setPredios] = useState<Predio[]>([]);
    const [idPredio, setIdPredio] = useState<number>();
    const [andar, setAndar] = useState<number>(0);
    const [ambientes, setAmbientes] = useState<Ambiente[]>([])
    const [idAmbiente, setIdAmbiente] = useState<number>();
    const [dataInicial, setDataInicial] = useState<string>();
    const [dataFinal, setDataFinal] = useState<string>();
    const [horarioInicial, setHorarioInicial] = useState<string>();
    const [horarioFinal, setHorarioFinal] = useState<string>();

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
            username: username,
            idAmbiente: idAmbiente,
            idStatus: 4,
            dataInicial: dataInicial,
            dataFinal: dataFinal,
            horarioInicial: horarioInicial,
            horarioFinal: horarioFinal
        }
        try{
            const response = await fetch("http://localhost:8080/reservas", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
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

    return (
        <form  onSubmit={reservar}>
            <div>
                <label>Usuário:</label>
                <input type="text" onChange={u => setUsername(u.target.value)} required></input>
            </div>
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