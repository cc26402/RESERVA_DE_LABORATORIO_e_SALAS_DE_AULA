'use client';
import { useEffect, useState } from "react";
import { Select } from "../select";
import { useRouter } from "next/navigation";
import style from "./Frmusuario.module.css"

export default function FrmUsuario({token = ""}){
    const url = (token ? `http://localhost:8080/usuarios/meusdados` : `http://localhost:8080/auth/cadastro`);
    const metodo = (token ? "PATCH" : "POST")
    //const [niveisAcesso, setNiveisAcesso] = useState([]);
    const [dadosUsuario, setDadosUsuario] = useState({CPF:"", prenome:"", sobrenome:"", nascimento:"", celular:"", email:"", senha:""});
    const [status, setStatus] = useState(null);
    const router = useRouter();

    useEffect(() => {
        /*fetch("http://localhost:8080/niveis_acesso")
            .then(async result => {
                const niveis = await result.json();
                if (!result.ok) {
                    alert('Erro ao buscar níveis de acesso.');
                    throw new Error('Erro ao buscar níveis de acesso.');
                }
                setNiveisAcesso(niveis);
            })
            .catch(erro => setStatus(erro.message));*/


        if (token) {
            fetch(url, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
                }
            })
            .then(async result => {
                const dados = await result.json();
                if (!result.ok){
                    console.log(result)
                    alert("Erro ao buscar dados do usuário.");
                    throw new Error("Erro ao buscar dados do usuário.");
                }
                const dadosComSenha = {...dados[0], senha:""}
                setDadosUsuario(dadosComSenha);
            })
            .catch(erro => setStatus(erro.message));
        }
    },[token, url]);

    useEffect(() => {
        console.log(status);
        if (status == "201") {
            router.replace("/")
        }
    }, [status, router]);

    function handlerChange(evento){
        const targetId = evento.target.id;
        const targetValue = evento.target.value;
        setDadosUsuario({...dadosUsuario, [targetId] : targetValue});
    }

    async function handlerSubmit(evento){
        evento.preventDefault();
        fetch(url,{
            method: metodo,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(dadosUsuario)
        })
        .then(async result => {
            const dados = await result.json()
            if (!result.ok) {
                throw new Error(dados.message);
            }
            setStatus(result.status)
            alert(dados.message)
        })
        .catch(erro => {
            setStatus(erro.message);
            alert(erro.message);
        })
    }
    

    return (
        <div className={style.div_form}>
            {!token && <h1>Preencha os campos abaixo para realizar seu cadastro</h1>}
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
                {!token && <div>
                    <label htmlFor="">Senha</label>
                    <input type="password" id="senha" onChange={handlerChange} required={!token}/>
                </div>}
                <button>Salvar</button>
            </form>
        </div>
    );
}