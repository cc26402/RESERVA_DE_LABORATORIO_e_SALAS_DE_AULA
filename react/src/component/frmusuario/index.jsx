"use client";
import { useEffect, useState } from "react";
import { Select } from "../select";

export default function FrmUsuario({cpf=""}){

    const [niveisAcesso, setNiveisAcesso] = useState([]);
    const [status, setStatus] = useState(null);
    const [dadosUsuarioAtual, setDadosUsuarioAtual] = useState({CPF: "", prenome:"", sobrenome:"", nascimento: "", celular:"", email:"", idNivelAcesso:0});

    const metodo = (cpf ? "PATCH" : "POST")
    const url = (cpf ? `http://localhost:8080/usuarios/${cpf}` : `http://localhost:8080/usuarios`)

    useEffect(() => {
        fetch("http://localhost:8080/niveis_acesso")
        .then(async result => {
            const niveis = await result.json();
            if (!result.ok) {
                const erroMsg = niveis.message;
                throw new Error(`Erro ao buscar níveis de acesso: ${erroMsg}`);
            }
            setNiveisAcesso(niveis);
        })
        .catch(erro => setStatus(erro.message));
    },[])


    useEffect(() => {
        if (cpf) {
            fetch(`http://localhost:8080/usuarios/${cpf}`)
            .then(async result => {
                const dadosUsuario = await result.json();
                if (!result.ok) {
                    const erroMsg = dadosUsuario.message;
                    throw new Error(`Erro ao buscar níveis de acesso: ${erroMsg}`);
                }
                setDadosUsuarioAtual(dadosUsuario[0]);
                
            })
        }
    },[cpf])

    async function handlerSubmit(evento){
        console.log(evento)
        evento.preventDefault();
        setDadosUsuarioAtual({
            name: document.getElementById("CPF").value,
            prenome: document.getElementById("nome").value,
            sobrenome: document.getElementById("sobrenome").value,
            nascimento: document.getElementById("nascimento").value,
            celular: document.getElementById("celular").value,
            email: document.getElementById("email").value,
            idNivelAcesso: document.getElementById("selectNivelAcesso").value
        });

        try{
            const response = await fetch(url,
                {
                    method: metodo,
                    header: {'Content-type' : 'application/json'},
                    body: JSON.stringify(dadosUsuarioAtual)
                }
            );

            if(!response.ok) throw new Error('Erro ao submeter dados');

            setStatus('Dados enviado com sucesso');
            setDadosUsuarioAtual({CPF: "", prenome:"", sobrenome:"", nascimento: "", celular:"", email:"", idNivelAcesso:0});

        }
        catch(erro){
            console.error(erro);
            setStatus("Erro ao enviar dados.")
        }
    }


    return (
        <>
            <form onSubmit={handlerSubmit}>
                <div>
                    <label htmlFor="">CPF</label>
                    <input type="text" id="CPF" defaultValue={dadosUsuarioAtual.CPF}/>
                </div>
                <div>
                    <label htmlFor="">Nome</label>
                    <input type="text" id="nome" defaultValue={dadosUsuarioAtual.prenome}/>
                </div>
                <div>
                    <label htmlFor="">Sobrenome</label>
                    <input type="text" id="sobrenome" defaultValue={dadosUsuarioAtual.sobrenome}/>
                </div>
                <div>
                    <label htmlFor="">Data de Nascimento</label>
                    <input type="date" id="nascimento" defaultValue={(dadosUsuarioAtual.nascimento.split("T"))[0]}/>
                </div>
                <div>
                    <label htmlFor="">Celular</label>
                    <input type="text" id="celular" defaultValue={dadosUsuarioAtual.celular}/>
                </div>
                <div>
                    <label htmlFor="">E-mail</label>
                    <input type="text" id="email" defaultValue={dadosUsuarioAtual.email}/>
                </div>
                <div>
                    <label htmlFor="">Nível de acesso</label>
                    <Select opcoes={niveisAcesso} chaveValor="idNivelAcesso" chaveTexto="nome" textoOptionPadrao="Selecione..." id="selectNivelAcesso" defaultValue={Number(dadosUsuarioAtual.idNivelAcesso)}></Select>
                </div>
                <button>Salvar</button>
            </form>
        </>
    );
}