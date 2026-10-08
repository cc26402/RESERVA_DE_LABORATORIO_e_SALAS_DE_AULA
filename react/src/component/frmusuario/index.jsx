'use client';
import { useEffect, useState } from "react";
import { Select } from "../select";
import style from "./Frmusuario.module.css"

export default function FrmUsuario({cpf= ""}){
    const url = (cpf ? `http://localhost:8080/usuarios/${cpf}` : `http://localhost:8080/usuarios`);
    const metodo = (cpf ? "PATCH" : "POST")
    const [niveisAcesso, setNiveisAcesso] = useState([]);
    const [dadosUsuario, setDadosUsuario] = useState({CPF:"", prenome:"", sobrenome:"", nascimento:"", celular:"", email:"", idNivelAcesso:0, senha:""});
    const [status, setStatus] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8080/niveis_acesso")
            .then(async result => {
                const niveis = await result.json();
                if (!result.ok) {
                    alert('Erro ao buscar níveis de acesso.');
                    throw new Error('Erro ao buscar níveis de acesso.');
                }
                setNiveisAcesso(niveis);
            })
            .catch(erro => setStatus(erro.message));

        if (cpf) {
            fetch(url)
            .then(async result => {
                const dados = await result.json();
                if (!result.ok){
                    alert("Erro ao buscar dados do usuário.");
                    throw new Error("Erro ao buscar dados do usuário.");
                }
                console.log(dados)
                const dadosComSenha = {...dados[0], senha:""}
                setDadosUsuario(dadosComSenha);
            })
            .catch(erro => setStatus(erro.message));
        }
    },[cpf, url]);

    function handlerChange(evento){
        const targetId = evento.target.id;
        const targetValue = evento.target.value;
        setDadosUsuario({...dadosUsuario, [targetId] : targetValue});
    }

    async function handlerSubmit(evento){
        evento.preventDefault();
        fetch(url,{
            method: metodo,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dadosUsuario)
        })
        .then(result => {
            if (!result.ok) {
                throw new Error(metodo=="POST" ? "Erro ao cadastrar usuário" : "Erro ao atualizar dados do usuário");
            }
            setStatus(metodo=="POST" ? "Usuário cadastrado com sucesso" : "Usuário alterado com sucesso")
            alert(status)
        })
        .catch(erro => {
            setStatus(erro.message);
            alert(status);
        })
    }
    

    return (
        <div className={style.div_form}>
            <form onSubmit={handlerSubmit}>
                <div>
                    <label htmlFor="">CPF</label>
                    <input type="number" id="CPF" value={dadosUsuario.CPF} onChange={handlerChange} required/>
                </div>
                <div>
                    <label htmlFor="">Nome</label>
                    <input type="text" id="prenome" value={dadosUsuario.prenome} onChange={handlerChange} required/>
                </div>
                <div>
                    <label htmlFor="">Sobrenome</label>
                    <input type="text" id="sobrenome" value={dadosUsuario.sobrenome} onChange={handlerChange} required/>
                </div>
                <div>
                    <label htmlFor="">Data de Nascimento</label>
                    <input type="date" id="nascimento" value={(dadosUsuario.nascimento ? (dadosUsuario.nascimento.split("T"))[0] : dadosUsuario.nascimento)} onChange={handlerChange} required/>
                </div>
                <div>
                    <label htmlFor="">Celular</label>
                    <input type="text" id="celular" value={dadosUsuario.celular} onChange={handlerChange} required/>
                </div>
                <div>
                    <label htmlFor="">E-mail</label>
                    <input type="text" id="email" value={dadosUsuario.email} onChange={handlerChange} required/>
                </div>
                {!cpf && <div>
                    <label htmlFor="">Senha</label>
                    <input type="password" id="senha" onChange={handlerChange} required={!cpf}/>
                </div>}
                <div>
                    <label htmlFor="">Nível de acesso</label>
                    <Select opcoes={niveisAcesso} chaveValor="idNivelAcesso" chaveTexto="nome" textoOptionPadrao="Selecione..." id="idNivelAcesso" value={dadosUsuario.idNivelAcesso} onChange={handlerChange}></Select>
                </div>
                <button>Salvar</button>
            </form>
        </div>
    );
}