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

    function abrirForm(id?: number) {
        const form = document.createElement("form");
        form.id = "formEditar";

        const titulo = document.createElement("h1");
        titulo.textContent = id ? "Alteração de Dados" : "Novo Ambiente";
        form.appendChild(titulo);

        const divId = document.createElement("div");
        const labelId = document.createElement("label");
        labelId.textContent = "Id: ";
        const inputId = document.createElement("input");
        inputId.type = "number";
        inputId.readOnly = true;
        inputId.value = id ? id.toString() : "";
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

        if (typeof predios !== 'undefined') {
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

        // INICIO ADAPTAÇAO
        const divBtn = document.createElement("div");
            
        const btnCancelar = document.createElement("button");
        btnCancelar.type = "button";
        btnCancelar.textContent = "Cancelar";
        btnCancelar.addEventListener("click", () => form.remove());

        if (id){
            const dadosAtuais = ambientes.find(amb => amb.idAmbiente === id);
            if (dadosAtuais) {
                inputNome.value = dadosAtuais.nome;
                selectTipo.value = dadosAtuais.idTipo.toString();
                inputCapacidade.value = dadosAtuais.capacidade.toString();
                inputAndar.value = dadosAtuais.andar.toString();
                selectPredio.value = dadosAtuais.idPredio.toString();
            }

            const btnAlterar = document.createElement("button");
            btnAlterar.type = "submit";
            btnAlterar.textContent = "Alterar";

            btnAlterar.addEventListener("click", async (e) => {
                e.preventDefault();

                const ambienteAtualizado: Ambiente = { 
                    idAmbiente: id, 
                    idPredio: Number(selectPredio.value), 
                    nome: inputNome.value, 
                    capacidade: Number(inputCapacidade.value), 
                    andar: Number(inputAndar.value), 
                    idTipo: Number(selectTipo.value) 
                };

                try {
                    const response = await fetch("http://localhost:8080/ambientes/" + id, {
                        method: "PATCH",
                        headers: { 'Content-type': 'application/json' },
                        body: JSON.stringify(ambienteAtualizado)
                    });

                    if (response.ok) {
                        setAmbientes(ambientes.map(amb => amb.idAmbiente === id ? ambienteAtualizado : amb));
                        form.remove();
                        alert("Ambiente atualizado com sucesso!");
                    } else {
                        console.error("Erro ao alterar ambiente:", response.status);
                    }
                } catch (erro) {
                    console.error("Erro ao alterar ambiente:", erro);
                }
            });
            divBtn.appendChild(btnAlterar);
            }
            else{
                const btnAdicionar = document.createElement("button");
                btnAdicionar.type = "button";
                btnAdicionar.textContent = "Adicionar";
                btnAdicionar.addEventListener("click", async (e) => {
                    e.preventDefault();
                    const ambienteNovo: Ambiente = { 
                        idAmbiente: 0, 
                        idPredio: Number(selectPredio.value), 
                        nome: inputNome.value, 
                        capacidade: Number(inputCapacidade.value), 
                        andar: Number(inputAndar.value), 
                        idTipo: Number(selectTipo.value) 
                    };
                    if (ambienteNovo.idPredio == 0 || ambienteNovo.andar == 0 || ambienteNovo.nome == "" || ambienteNovo.capacidade == 0 || ambienteNovo.idTipo == 0) return alert("dados incompletos")
                    try {
                        const response = await fetch("http://localhost:8080/ambientes/", {
                            method: "POST",
                            headers: { 'Content-type': 'application/json' },
                            body: JSON.stringify(ambienteNovo)
                        });

                        if (response.ok) {
                            alert("Ambiente adicionado com sucesso!");
                        } else {
                            console.error("Erro ao alterar ambiente:", response.status);
                        }
                    } catch (erro) {
                        console.error("Erro ao alterar ambiente:", erro);
                    }
                });
                divBtn.appendChild(btnAdicionar);
            }

            divBtn.appendChild(btnCancelar);
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
                <button onClick={() => abrirForm()}>Novo ambiente</button>
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
        </main>
    )
}