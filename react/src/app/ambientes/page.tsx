"use client"
interface Predio {
    id: number;
    nome: string;
}

import { useState, useEffect } from "react";
import style from "./ambientes.module.css"

export default function Ambiente(){

    const [operacao, setOperacao] = useState("Adicionar");
    const [predio, setPredio] = useState<Predio[]>([]);
    const [nome, setNome] = useState("");
    const [capacidade, setCapacidade] = useState(0);
    const [andar, setAndar] = useState(0);
    const [idTipo, setIdTipo] = useState(1);
    const [idPredio, setIdPredio] = useState(0);

    useEffect(() => {
        async function buscarPredios() {
            try{
                const response = await fetch("http://localhost:8080/predios");
                if (!response.ok) throw new Error("Falha ao acessar o BD");
                const dados: Predio[] = await response.json();
                setPredio(dados);
                if (dados.length > 0) setIdPredio(dados[0].id);
            }
            catch(erro){
                console.log(erro);
            }
        }
        buscarPredios();
    }, []);

    async function cadastrarAmbiente(e: React.FormEvent) {
        e.preventDefault();
        const novo = { nome, capacidade, andar, idTipo, idPredio };
        try {
            const response = await fetch("http://localhost:8080/ambientes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(novo),
            });
            if (!response.ok) throw new Error("Falha ao cadastrar: " + response.status);
            setNome("");
            setCapacidade(0);
            setAndar(0);
        } catch (erro) {
            console.log(erro);
        }
    }

    return(
        <div className={style.body}>
            <div className={style.selectOperacao}>
                <label>Operação: </label>
                <select value={operacao} onChange={(e) => setOperacao(e.target.value)}>
                    <option value={"Adicionar"}>Adicionar</option>
                    <option value={"Excluir"}>Excluir</option>
                    <option value={"Editar"}>Editar</option>
                </select>
            </div>

            <div>
                {(operacao === "Adicionar") && (
                    <form className={style.form} onSubmit={cadastrarAmbiente}>
                        <h1>Novo Ambiente</h1>
                        <div>
                            <label>Nome:</label>
                            <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
                        </div>
                        <div>
                            <label>Capacidade:</label>
                            <input type="number" value={capacidade} onChange={(e) => setCapacidade(Number(e.target.value))} />
                        </div>
                        <div>
                            <label>Andar:</label>
                            <input type="number" value={andar} onChange={(e) => setAndar(Number(e.target.value))} />
                        </div>
                        <div>
                            <label>Tipo:</label>
                            <select value={idTipo} onChange={(e) => setIdTipo(Number(e.target.value))}>
                                <option value={1}>Sala</option>
                                <option value={2}>Laboratório</option>
                            </select>
                        </div>
                        <div>
                            <label>Prédio:</label>
                            <select value={idPredio} onChange={(e) => setIdPredio(Number(e.target.value))}>
                                {predio.map(p => <option value={p.id} key={p.id}>{p.nome}</option>)}
                            </select>
                        </div>
                        <button type="submit">Adicionar</button>
                    </form>
                )}
            </div>
        </div>
    )
}