"use client"
import { useState, useEffect } from "react";
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

    const [idAmbiente, setIdAmbiente] = useState(0)
    const [nome, setNome] = useState("");
    const [idTipo, setIdTipo] = useState(1);
    const [capacidade, setCapacidade] = useState(1);
    const [andar, setAndar] = useState(0);
    const [idPredio, setIdPredio] = useState(0);

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

    useEffect(() => {
        if (form?.modo == "editar" && form.dados) {
            setIdAmbiente(form.dados.idAmbiente);
            setNome(form.dados.nome);
            setIdTipo(form.dados.idTipo);
            setCapacidade(form.dados.capacidade);
            setAndar(form.dados.andar);
            setIdPredio(form.dados.idPredio);
        } else if (form?.modo == "adicionar") {
            setIdAmbiente(0);
            setNome("");
            setIdTipo(1);
            setCapacidade(1);
            setAndar(0);
            setIdPredio(predios[0]?.idPredio || 0);
        }
    }, [form, predios]);

    async function listarAmbientes() {
        try {
            const response = await fetch("http://localhost:8080/ambientes");
            setAmbientes(await response.json());
        } catch (erro) {
            console.error("Erro ao buscar ambientes:", erro);
        }
    }

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

    async function cadastrarAmbiente() {
        const dados: Ambiente = {
            idAmbiente: 0,
            idPredio: idPredio,
            nome: nome,
            capacidade: capacidade,
            andar: andar,
            idTipo: idTipo,
        };

        try {
            const response = await fetch("http://localhost:8080/ambientes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dados),
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

    async function alterarAmbiente() {
        const dados: Ambiente = {
            idAmbiente: idAmbiente,
            idPredio: idPredio,
            nome: nome,
            capacidade: capacidade,
            andar: andar,
            idTipo: idTipo,
        };

        try {
            const response = await fetch("http://localhost:8080/ambientes/" + dados.idAmbiente, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dados),
            });
            if (response.ok) {
                setAmbientes(ambientesMN => ambientesMN.map(amb =>
                    amb.idAmbiente == dados.idAmbiente ? dados : amb
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
            <div id="header" className={style.divHeader}>
                <button onClick={() => setForm({ modo: "adicionar" })} className={style.btnNovoAmbiente}>Novo ambiente</button>
            </div>
            <div id="listaDeAmbientes" className={style.listaDeAmbientes}>
                {ambientes.map((ambiente) => (
                    <div key={ambiente.idAmbiente} className={style.cardsAmbientes}>
                        <h1>{ambiente.nome}</h1>
                        <div className={style.dadosCard}>
                            <h2>Id: {ambiente.idAmbiente}</h2>
                            <hr></hr>
                            <h2>Tipo: {ambiente.idTipo == 1 ? "Sala" : "Laboratório"}</h2>
                            <hr></hr>
                            <h2>Capacidade: {ambiente.capacidade}</h2>
                            <hr></hr>
                            <h2>Andar: {ambiente.andar}</h2>
                            <hr></hr>
                            <h2>Prédio: {predios.find(predio => predio.idPredio == ambiente.idPredio)?.nome}</h2>
                            <hr></hr>
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
                    <form className={style.formAmbiente} onSubmit={e => e.preventDefault()}>
                        <h1>Novo Ambiente</h1>
                        <div>
                            <label>Nome: </label>
                            <input type="text" name="nome" value={nome} required onChange={e => setNome(e.target.value)}/>
                        </div>
                        <div>
                            <label>Tipo: </label>
                            <select name="idTipo" value={idTipo} onChange={e => setIdTipo(Number(e.target.value))}>
                                <option value="1">Sala</option>
                                <option value="2">Laboratório</option>
                            </select>
                        </div>
                        <div>
                            <label>Capacidade: </label>
                            <input type="number" min="1" value={capacidade} onChange={e => setCapacidade(Number(e.target.value))} required />
                        </div>
                        <div>
                            <label>Andar: </label>
                            <input type="number" value={andar} onChange={e => setAndar(Number(e.target.value))} required />
                        </div>
                        <div>
                            <label>Prédio: </label>
                            <select value={idPredio} onChange={e => setIdPredio(Number(e.target.value))} required>
                                <option value={0} disabled>Selecione...</option>
                                {predios.map(p => (
                                    <option key={p.idPredio} value={p.idPredio}>{p.nome}</option>
                                ))}
                            </select>
                        </div>
                        <div className={style.divBtn}>
                            <button type="button" className={style.btnAdicionar} onClick={() => cadastrarAmbiente()}>Adicionar</button>
                            <button type="button" className={style.btnCancelar} onClick={() => setForm(null)}>Cancelar</button>
                        </div>
                    </form>
                )}
                {form?.modo === "editar" && form.dados && (
                    <form className={style.formAmbiente} onSubmit={e => e.preventDefault()}>
                        <h1>Alteração de Dados</h1>
                        <div>
                            <label>Id: </label>
                            {/* Inputs controlados agora usam 'value' diretamente conectado ao useState atualizado */}
                            <input type="number" value={idAmbiente} readOnly />
                        </div>
                        <div>
                            <label>Nome: </label>
                            <input type="text" value={nome} onChange={e => setNome(e.target.value)} required />
                        </div>
                        <div>
                            <label>Tipo: </label>
                            <select value={idTipo} onChange={e => setIdTipo(Number(e.target.value))}>
                                <option value="1">Sala</option>
                                <option value="2">Laboratório</option>
                            </select>
                        </div>
                        <div>
                            <label>Capacidade: </label>
                            <input type="number" min="1" value={capacidade} onChange={e => setCapacidade(Number(e.target.value))} required />
                        </div>
                        <div>
                            <label>Andar: </label>
                            <input type="number" value={andar} onChange={e => setAndar(Number(e.target.value))} required />
                        </div>
                        <div>
                            <label>Prédio: </label>
                            <select value={idPredio} onChange={e => setIdPredio(Number(e.target.value))}>
                                {predios.map(p => (
                                    <option key={p.idPredio} value={p.idPredio}>{p.nome}</option>
                                ))}
                            </select>
                        </div>
                        <div className={style.divBtn}>
                            <button type="button" className={style.btnAlterar} onClick={() => alterarAmbiente()}>Alterar</button>
                            <button type="button" className={style.btnCancelar} onClick={() => setForm(null)}>Cancelar</button>
                        </div>
                    </form>
                )}
            </div>
        </main>
    );
}