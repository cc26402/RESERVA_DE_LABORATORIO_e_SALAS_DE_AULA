"use client"
import { useState, useEffect } from "react";
import style from "./ambientes.module.css";
import { create } from "domain";

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

export default function Ambientes() {

    const [ambientes, setAmbientes] = useState<Ambiente[]>([]);
    useEffect(() => {
        async function listarAmbientes() {
            try {
                const response = await fetch("http://localhost:8080/ambientes");
                const dados = await response.json();
                setAmbientes(dados);
            } catch (erro) {
                console.error("Erro ao buscar ambientes:", erro);
            }
        }
        listarAmbientes();
    }, [])

    const [predios, setPredios] = useState<Predio[]>([]);
    useEffect(() => {
        async function listarPredios() {
            try {
                const response = await fetch("http://localhost:8080/predios");
                const dados = await response.json();
                setPredios(dados);
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
                setAmbientes(ambientes.filter(amb => amb.idAmbiente != id));
            } else {
                console.error("Erro ao excluir ambiente:", response.status);
            }
        } catch (erro) {
            console.error("Erro ao excluir ambiente:", erro);
        }
    }

    function abrirForm(id: number) {
        const form = document.createElement("form");
        form.id = "formEditar";

        const titulo = document.createElement("h1");
        titulo.textContent = "Alteração de Dados";
        form.appendChild(titulo);

        const divId = document.createElement("div");
        const labelId = document.createElement("label");
        labelId.textContent = "Id: ";
        const inputId = document.createElement("input");
        inputId.type = "number";
        inputId.readOnly = true;
        inputId.value = id.toString();
        divId.appendChild(labelId);
        divId.appendChild(inputId);
        form.appendChild(divId);

        const divNome = document.createElement("div");
        const labelNome = document.createElement("label");
        labelNome.textContent = "Nome: ";
        const inputNome = document.createElement("input");
        inputNome.type = "text";
        divNome.appendChild(labelNome);
        divNome.appendChild(inputNome);
        form.appendChild(divNome);

        const divTipo = document.createElement("div");
        const labelTipo = document.createElement("label");
        labelTipo.textContent = "Tipo: ";
        const selectTipo = document.createElement("select");
        
        const optSala = document.createElement("option");
        optSala.value = "1";
        optSala.textContent = "Sala";
        
        const optLab = document.createElement("option");
        optLab.value = "2";
        optLab.textContent = "Laboratório";
        
        selectTipo.appendChild(optSala);
        selectTipo.appendChild(optLab);
        divTipo.appendChild(labelTipo);
        divTipo.appendChild(selectTipo);
        form.appendChild(divTipo);


        const divCapacidade = document.createElement("div");
        const labelCapacidade = document.createElement("label");
        labelCapacidade.textContent = "Capacidade: ";
        const inputCapacidade = document.createElement("input");
        inputCapacidade.type = "number";
        divCapacidade.appendChild(labelCapacidade);
        divCapacidade.appendChild(inputCapacidade);
        form.appendChild(divCapacidade);

        const divAndar = document.createElement("div");
        const labelAndar = document.createElement("label");
        labelAndar.textContent = "Andar: ";
        const inputAndar = document.createElement("input");
        inputAndar.type = "number";
        divAndar.appendChild(labelAndar);
        divAndar.appendChild(inputAndar);
        form.appendChild(divAndar);

        const divPredio = document.createElement("div");
        const labelPredio = document.createElement("label");
        labelPredio.textContent = "Prédio: ";
        const selectPredio = document.createElement("select");

        if (typeof predios !== 'undefined' && Array.isArray(predios)) {
            predios.forEach(p => {
                const opt = document.createElement("option");
                opt.value = p.idPredio.toString();
                opt.textContent = p.nome;
                selectPredio.appendChild(opt);
            });
        }
        
        divPredio.appendChild(labelPredio);
        divPredio.appendChild(selectPredio);
        form.appendChild(divPredio);

        const divBtn = document.createElement("div");
        
        const btnCancelar = document.createElement("button");
        btnCancelar.type = "button";
        btnCancelar.textContent = "Cancelar";

        btnCancelar.addEventListener("click", () => form.remove()); 

        const btnAlterar = document.createElement("button");
        btnAlterar.type = "submit";
        btnAlterar.textContent = "Alterar";

        divBtn.appendChild(btnCancelar);
        divBtn.appendChild(btnAlterar);
        form.appendChild(divBtn);

        const divDeFormulario = document.getElementById("form");
        
        if (divDeFormulario) {
            divDeFormulario.innerHTML = "";
            divDeFormulario.appendChild(form);
        }
    }

    return (
        <main>
            <div id="header">
                <button>Novo ambiente</button>
            </div>
            <div id="listaDeAmbientes">
                {ambientes.map((ambiente) => (
                    <div key={ambiente.idAmbiente} className={style.cardsAmbientes}>
                        <h1>{ambiente.nome}</h1>
                        <div>
                            <h2>Id: {ambiente.idAmbiente}</h2>
                            <h2>Tipo: {ambiente.idTipo == 1 ? "Sala" : "Laboratório"}</h2>
                            <h2>Capacidade: {ambiente.capacidade}</h2>
                            <h2>Andar: {ambiente.andar}</h2>
                            <h2>Prédio: {predios.find(predio => predio.idPredio == ambiente.idPredio)?.nome}</h2>
                            <div>
                                <button onClick={() => abrirForm(ambiente.idAmbiente)}>Editar</button>
                                <button onClick={() => excluirAmbiente(ambiente.idAmbiente)}>Excluir</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div id="form"></div>
            {/* {(
                <form id="formEditar">
                    <h1>Alteração de Dados</h1>
                    <div>
                        <label>Id: </label>
                        <input type="number" readOnly/>
                    </div>
                    <div>
                        <label>Nome: </label>
                        <input type="text"/>
                    </div>
                    <div>
                        <label>Tipo: </label>
                        <select>
                            <option value="1">Sala</option>
                            <option value="2">Laboratório</option>
                        </select>
                    </div>
                    <div>
                        <label>Capacidade: </label>
                        <input type="number"/>
                    </div>
                    <div>
                        <label>Andar: </label>
                        <input type="number"/>
                    </div>
                    <div>
                        <label>Prédio: </label>
                        <select>
                            {predios.map(p => (
                                <option key={p.idPredio} value={p.idPredio}>{p.nome}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <button type="button">Cancelar</button>
                        <button type="submit">Alterar</button>
                    </div>
                </form>
            )} */}
        </main>
    )
}