"use client"
import { useState, useEffect, FormEvent } from "react";
import style from "./ambientes.module.css";

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

type estadoForm = {
    modo: "adicionar" | "editar";
    dados?: Ambiente;
} | null;

export default function Ambientes() {

    const [ambientes, setAmbientes] = useState<Ambiente[]>([]);
    const [predios, setPredios] = useState<Predio[]>([]);
    const [form, setForm] = useState<estadoForm>(null);

    async function listarAmbientes() {
        try {
            const response = await fetch("http://localhost:8080/ambientes");
            setAmbientes(await response.json());
        } catch (erro) {
            console.error("Erro ao buscar ambientes:", erro);
        }
    }

    useEffect(() => {
        listarAmbientes();
    }, [])

    useEffect(() => {
        async function listarPredios() {
            try {
                const response = await fetch("http://localhost:8080/predios");
                setPredios(await response.json());
            } catch (erro) {
                console.error("Erro ao buscar prédios:", erro);
            }
        }
        listarPredios()
    }, [])

    async function excluirAmbiente(id: number) {
        try {
            const response = await fetch("http://localhost:8080/ambientes/" + id, {
                method: "DELETE"
            });
            if (response.ok) {
                if (response.ok) {
                const ambientesMN = ambientes.filter(amb => amb.idAmbiente !== id);
                setAmbientes(ambientesMN);
            }
            } else {
                console.error("Erro ao excluir ambiente:", response.status);
            }
        } catch (erro) {
            console.error("Erro ao excluir ambiente:", erro);
        }
    }

    async function cadastrarAmbiente(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const dados = new FormData(e.currentTarget);

        const ambienteNovo = {
            nome: String(dados.get("nome")),
            idTipo: Number(dados.get("idTipo")),
            capacidade: Number(dados.get("capacidade")),
            andar: Number(dados.get("andar")),
            idPredio: Number(dados.get("idPredio")),
        };

        try {
            const response = await fetch("http://localhost:8080/ambientes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(ambienteNovo),
            });
            if (response.ok) {
                await listarAmbientes();
                setForm(null);
            } else {
                console.error("Erro ao adicionar ambiente:", response.status);
                alert("Erro ao adicionar ambiente");
            }
        } catch (erro) {
            console.error("Erro ao adicionar ambiente:", erro);
            alert("Erro ao adicionar ambiente");
        }
    }

    async function alterarAmbiente(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const dados = new FormData(e.currentTarget);

        const ambienteAtualizado: Ambiente = {
            idAmbiente: Number(dados.get("idAmbiente")),
            nome: String(dados.get("nome")),
            idTipo: Number(dados.get("idTipo")),
            capacidade: Number(dados.get("capacidade")),
            andar: Number(dados.get("andar")),
            idPredio: Number(dados.get("idPredio")),
        };

        try {
            const response = await fetch("http://localhost:8080/ambientes/" + ambienteAtualizado.idAmbiente, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(ambienteAtualizado),
            });
            if (response.ok) {
                setAmbientes(ambientesMN => ambientesMN.map(amb =>
                    amb.idAmbiente == ambienteAtualizado.idAmbiente ? ambienteAtualizado : amb
                ));
                setForm(null);
            }
            else{
                console.error("Erro ao alterar ambiente");
                alert("Erro ao alterar ambiente");
            }
        } catch (erro) {
            console.error("Erro ao alterar ambiente:", erro);
            alert("Erro ao alterar ambiente");
        }
    }

    return (
        <main className={style.main}>
            <div id="header">
                <button onClick={() => setForm({ modo: "adicionar" })} className={style.btnNovoAmbiente}>Novo ambiente</button>
            </div>
            <div id="listaDeAmbientes" className={style.listaDeAmbientes}>
                {ambientes.map((ambiente) => (
                    <div key={ambiente.idAmbiente} className={style.cardsAmbientes}>
                        <h1>{ambiente.nome}</h1>
                        <div className={style.dadosCard}>
                            <h2>Id: {ambiente.idAmbiente}</h2>
                            <h2>Tipo: {ambiente.idTipo == 1 ? "Sala" : "Laboratório"}</h2>
                            <h2>Capacidade: {ambiente.capacidade}</h2>
                            <h2>Andar: {ambiente.andar}</h2>
                            <h2>Prédio: {predios.find(predio => predio.idPredio == ambiente.idPredio)?.nome}</h2>
                            <div className={style.divBtnCards}>
                                <button onClick={() => setForm({ modo: "editar", dados: ambiente })} className={style.btnEditar}>Editar</button>
                                <button onClick={() => excluirAmbiente(ambiente.idAmbiente)} className={style.btnExcluir}>Excluir</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div id="form">
                {form?.modo === "adicionar" && (
                    <form className={style.formAmbiente} onSubmit={cadastrarAmbiente}>
                        <h1>Novo Ambiente</h1>
                        <div>
                            <label>Nome: </label>
                            <input type="text" name="nome" required />
                        </div>
                        <div>
                            <label>Tipo: </label>
                            <select name="idTipo">
                                <option value="1">Sala</option>
                                <option value="2">Laboratório</option>
                            </select>
                        </div>
                        <div>
                            <label>Capacidade: </label>
                            <input type="number" name="capacidade" min="1" required />
                        </div>
                        <div>
                            <label>Andar: </label>
                            <input type="number" name="andar" required />
                        </div>
                        <div>
                            <label>Prédio: </label>
                            <select name="idPredio" required defaultValue="">
                                <option value="">Selecione...</option>
                                {predios.map(p => (
                                    <option key={p.idPredio} value={p.idPredio}>{p.nome}</option>
                                ))}
                            </select>
                        </div>
                        <div className={style.divBtn}>
                            <button type="submit" className={style.btnAdicionar}>Adicionar</button>
                            <button type="button" className={style.btnCancelar} onClick={() => setForm(null)}>Cancelar</button>
                        </div>
                    </form>
                )}

                {form?.modo === "editar" && form.dados && (
                    <form key={form.dados.idAmbiente} className={style.formAmbiente} onSubmit={alterarAmbiente}>
                        <h1>Alteração de Dados</h1>
                        <div>
                            <label>Id: </label>
                            <input type="number" name="idAmbiente" readOnly defaultValue={form.dados.idAmbiente}/>
                        </div>
                        <div>
                            <label>Nome: </label>
                            <input type="text" name="nome" required defaultValue={form.dados.nome} />
                        </div>
                        <div>
                            <label>Tipo: </label>
                            <select name="idTipo" defaultValue={form.dados.idTipo}>
                                <option value="1">Sala</option>
                                <option value="2">Laboratório</option>
                            </select>
                        </div>
                        <div>
                            <label>Capacidade: </label>
                            <input type="number" name="capacidade" min="1" required defaultValue={form.dados.capacidade} />
                        </div>
                        <div>
                            <label>Andar: </label>
                            <input type="number" name="andar" required defaultValue={form.dados.andar} />
                        </div>
                        <div>
                            <label>Prédio: </label>
                            <select name="idPredio" defaultValue={form.dados.idPredio}>
                                {predios.map(p => (
                                    <option key={p.idPredio} value={p.idPredio}>{p.nome}</option>
                                ))}
                            </select>
                        </div>
                        <div className={style.divBtn}>
                            <button type="submit" className={style.btnAlterar}>Alterar</button>
                            <button type="button" className={style.btnCancelar} onClick={() => setForm(null)}>Cancelar</button>
                        </div>
                    </form>
                )}
            </div>
        </main>
    )
}