import { useEffect, useState } from "react";

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

export function frmEditarReserva({ idReserva }){

    const [reservas, setReservas] = useState<Reserva[]>([]);
    const [ambientes, setAmbientes] = useState<Ambiente[]>([]);
    const [predios, setPredios] = useState<Predio[]>([]);
    
    useEffect(() => {
        async function buscarReservas() {
            try{
                const response = await fetch("http://localhost:8080/reservas");
                const dados: Reserva = await response.json;
                if (!response.ok) throw new Error("Falha ao buscar dados do BD");
                setReservas(dados);
            } catch(erro){
                throw new Error("Falha ao buscar dados do BD," + erro)
            }
        }
        buscarReservas();
    }, [])

    useEffect(() => {
        async function buscarPredios() {
            try{
                const response = await fetch("http://localhost:8080/predios");
                const dados: Predio = await response.json;
                if (!response.ok) throw new Error("Falha ao buscar dados do BD");
                setPredios(dados);
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
                const dados: Promise<Ambiente> = await response.json;
                if (!response.ok) throw new Error("Falha ao buscar dados do BD");
                setAmbientes(dados);
            } catch(erro){
                throw new Error("Falha ao buscar dados do BD," + erro)
            }
        }
        buscarAmbientes();
    }, [])

    return(
        <form>
            <h1>Editar Reserva</h1>
            <div>
                <label>Ambiente</label>
                <select>
                    {
                        ambientes.map(amb => {
                            return(
                                <option value={amb.idAmbiente}>{amb.nome}</option>
                            )
                        })
                    }
                </select>
            </div>
            <div>
                <label></label>
                <input></input>
            </div>
            <div>
                <label></label>
                <input></input>
            </div>
            <div>
                <label></label>
                <input></input>
            </div>
            <div>
                <label></label>
                <input></input>
            </div>
            <div>
                <label></label>
                <input></input>
            </div>
        </form>
    )
}