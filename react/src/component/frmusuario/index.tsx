"use client";
import { useEffect, useState } from "react";
import { Select } from "../select";

export default function FrmUsuario({cpf=""}){

    const [niveisAcesso, setNiveisAcesso] = useState([]);
    const [erro, setErro] = useState("");
    const [dadosUsuarioAtual, setDadosUsuarioAtual] = useState({CPF: "", prenome:"", sobrenome:"", nascimento: "", celular:"", email:"", idNivelAcesso:0});

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
        .catch(erro => setErro(erro.message));
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


    return (
        <form>
            <div>
                <label htmlFor="">CPF</label>
                <input type="text" defaultValue={dadosUsuarioAtual.CPF}/>
            </div>
            <div>
                <label htmlFor="">Nome</label>
                <input type="text" defaultValue={dadosUsuarioAtual.prenome}/>
            </div>
            <div>
                <label htmlFor="">Sobrenome</label>
                <input type="text" defaultValue={dadosUsuarioAtual.sobrenome}/>
            </div>
            <div>
                <label htmlFor="">Data de Nascimento</label>
                <input type="date" defaultValue={(dadosUsuarioAtual.nascimento.split("T"))[0]}/>
            </div>
            <div>
                <label htmlFor="">Celular</label>
                <input type="text" defaultValue={dadosUsuarioAtual.celular}/>
            </div>
            <div>
                <label htmlFor="">E-mail</label>
                <input type="text" defaultValue={dadosUsuarioAtual.email}/>
            </div>
            <div>
                <label htmlFor="">Nível de acesso</label>
                <Select opcoes={niveisAcesso} chaveValor="idNivelAcesso" chaveTexto="nome" textoOptionPadrao="Selecione..." id="selectNivelAcesso" value={dadosUsuarioAtual.idNivelAcesso}></Select>
            </div>
            <button>Salvar</button>
        </form>
    );
}