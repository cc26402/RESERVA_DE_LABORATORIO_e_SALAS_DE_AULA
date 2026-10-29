'use client';
import { useEffect, useState } from "react";
import { Select } from "../select";
import { useRouter } from "next/navigation";
import style from "./Frmusuario.module.css"

export default function FrmUsuario({token = ""}){
    const url = (token ? `http://localhost:8080/usuarios/meusdados` : `http://localhost:8080/auth/cadastro`);
    const metodo = (token ? "PATCH" : "POST");
    //const [niveisAcesso, setNiveisAcesso] = useState([]);
    const [dadosUsuario, setDadosUsuario] = useState({CPF: "", prenome: "", sobrenome: "", nascimento: "", celular: "", email: "", senha: ""});
    const [dadosSenhaUsuario, setDadosSenhaUsuario] = useState({senhaAtual: "", senha: ""});
    const [status, setStatus] = useState(null);
    const [deveExibirFormAlterarSenha, setDeveExibirFormAlterarSenha] = useState(false);
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

    useEffect(() => { //ao realizar cadastro com sucesso, redireciona para a tela de login
        if (status == "201") {
            router.replace("/")
        }
    }, [status, router]);

    function validaToken() {
        fetch("http://localhost:8080/auth/valida", {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
            }
        })
        .then(async result => {
            if (!result.ok) {
            localStorage.removeItem('loginToken');
            alert("Necessário estar logado para acessar esse recurso");
            router.replace("/")
            }
            console.log("Token validado com sucesso ao alterar senha");
        })
    }

    function handlerChange(evento){
        const targetId = evento.target.id;
        const targetValue = evento.target.value;
        setDadosUsuario({...dadosUsuario, [targetId] : targetValue});
    }

    function handlerSenhaChange(evento) {
        const targetId = evento.target.id;
        const targetValue = evento.target.value;
        if (targetId == "senha_atual") {
            setDadosSenhaUsuario({...dadosSenhaUsuario, senhaAtual: targetValue});
        }
        else {
            setDadosSenhaUsuario({...dadosSenhaUsuario, senha: targetValue});
        }
    }

    async function handlerSubmit(evento){
        evento.preventDefault();
        if (camposOk()) {
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
                setStatus(result.status);
                alert(dados.message);
            })
            .catch(erro => {
                setStatus(erro.message);
                alert(erro.message);
            })
        }
    }

    function handlerSenhaSubmit(evento) {
        evento.preventDefault();
        validaToken();
        const url = `http://localhost:8080/logins/${dadosSenhaUsuario.senhaAtual}`;
        if (novaSenhaOk()) {
            fetch(url, {
                    method: "PATCH",
                    headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({senha: dadosSenhaUsuario.senha})
                }
            )
            .then(async result => {
                    const dados = await result.json();
                    if (!result.ok) {
                        throw new Error(dados.message);
                    }
                    setStatus(result.status);
                    alert("Senha alterada com sucesso");
                    setDeveExibirFormAlterarSenha(false);
                }
            )
            .catch(erro => {
                    setStatus(erro.message);
                    alert(erro.message);
                }
            );
        }
    }

    function camposOk() {
        const cpf = document.getElementById('CPF');
        const prenome = document.getElementById('prenome');
        const sobrenome = document.getElementById('sobrenome');
        const nascimento = document.getElementById('nascimento');
        const celular = document.getElementById('celular');
        const email = document.getElementById('email');
        const senha = document.getElementById('senha');

        let tudoOk = true;

        if (!cpf.value || cpf.value.length < 11 || cpf.value.length > 13) {
            tudoOk = false;
            estilizaCampoInvalido(cpf);
        } else {
            const cpfLimpo = cpf.value.replace("-", "").replace(".","").replace("e", "");
            setDadosUsuario({...dadosUsuario, "CPF" : cpfLimpo});
        }
        if (!prenome.value) {
            tudoOk = false;
            estilizaCampoInvalido(prenome);
        } else {
            const prenomeLimpo = prenome.value.trim();
            setDadosUsuario({...dadosUsuario, "prenome" : prenomeLimpo});
        }
        if (!sobrenome.value) {
            tudoOk = false;
            estilizaCampoInvalido(sobrenome);
        } else {
            const sobrenomeLimpo = sobrenome.value.trim();
            setDadosUsuario({...dadosUsuario, "sobrenome" : sobrenomeLimpo});
        }
        if (!nascimento.value) {
            tudoOk = false;
            estilizaCampoInvalido(nascimento);
        }
        if (!celular.value || celular.value.length != 11 ) {
            tudoOk = false;
            estilizaCampoInvalido(celular);
        } else {
            const celularLimpo = celular.value.replace("-", "").replace(".","").replace("e", "");
            setDadosUsuario({...dadosUsuario, "celular" : celularLimpo});
        }
        if (!email.value || !email.value.includes("@")) {
            tudoOk = false;
            estilizaCampoInvalido(email);
        } else {
            const emailLimpo = email.value.trim();
            setDadosUsuario({...dadosUsuario, "email" : emailLimpo});
        }
        if (!token && !senha.value) {
            tudoOk = false;
            estilizaCampoInvalido(senha);
        }
        if (!token && senha.value && tudoOk) {
            if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(senha.value))) {
                tudoOk = false;
                estilizaCampoInvalido(senha);
                alert("Senha deve conter ao menos 8 caracteres, 1 letra minúscula, 1 letra maiúscula, 1 número e 1 caractere especial");
    
            } else {
                setDadosUsuario({...dadosUsuario, senha : senha.value});
            }
        }

        return tudoOk;
    }

    function novaSenhaOk() {
        const novaSenha = document.getElementById('nova_senha');
        const senhaAtual = document.getElementById("senha_atual");
        if (!senhaAtual.value) {
            estilizaCampoInvalido(senhaAtual);
            return false;
        }
        if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(novaSenha.value))) {
            estilizaCampoInvalido(novaSenha);
            alert("Nova senha deve conter ao menos 8 caracteres, 1 letra minúscula, 1 letra maiúscula, 1 número e 1 caractere especial");
            return false;
        }
        else return true;
    }

    useEffect(() => console.log(dadosUsuario), [dadosUsuario]);
    useEffect(() => console.log(dadosSenhaUsuario), [dadosSenhaUsuario]);

    function estilizaCampoInvalido(input) {
        input.style.boxShadow = "0 0 3px 1px rgba(255, 0, 0, 1)";
    }

    function limpaCampo(evento) {
        if (evento.target.matches('input')) {
            evento.target.style.boxShadow = "";
        }
    }

    return (
        <div className={style.div_form}>
            {!token && <h1>Preencha os campos abaixo para realizar seu cadastro</h1>}
            <form onSubmit={handlerSubmit} onBlur={limpaCampo} className={style.form_principal} noValidate>
                <div className={style.divs_inputs}>
                    <label htmlFor="">CPF</label>
                    <input type="number" id="CPF" value={dadosUsuario.CPF} onChange={handlerChange} />
                </div>
                <div className={style.divs_inputs}>
                    <label htmlFor="">Nome</label>
                    <input type="text" id="prenome" value={dadosUsuario.prenome} onChange={handlerChange} />
                </div>
                <div className={style.divs_inputs}>
                    <label htmlFor="">Sobrenome</label>
                    <input type="text" id="sobrenome" value={dadosUsuario.sobrenome} onChange={handlerChange} />
                </div>
                <div className={style.divs_inputs}>
                    <label htmlFor="">Data de Nascimento</label>
                    <input type="date" id="nascimento" value={(dadosUsuario.nascimento ? (dadosUsuario.nascimento.split("T"))[0] : dadosUsuario.nascimento)} onChange={handlerChange} />
                </div>
                <div className={style.divs_inputs}>
                    <label htmlFor="">Celular</label>
                    <input type="number" id="celular" value={dadosUsuario.celular} onChange={handlerChange} />
                </div>
                <div className={style.divs_inputs}>
                    <label htmlFor="">E-mail</label>
                    <input type="text" id="email" value={dadosUsuario.email} onChange={handlerChange} />
                </div>
                {!token && <div className={style.divs_inputs}>
                    <label htmlFor="">Senha</label>
                    <input type="password" id="senha" onChange={handlerChange} /*required={!token}*/ />
                </div>}
                <div className={style.div_buttons}>
                    {/* {token && <button type="button"  className={style.btn_apagar_conta}>Apagar conta</button>} */}
                    {token && <button type="button" className={style.btn_alternativo} onClick={() => setDeveExibirFormAlterarSenha(true)}>Alterar senha</button>}
                    {!token && <button type="button" className={style.btn_alternativo} onClick={() => router.replace("/")}>Retornar para login</button>}
                    <button className={style.btns}>Salvar</button>
                </div>
            </form>
            {deveExibirFormAlterarSenha &&
                <div className={style.div_form_altera_senha}>
                    <form onSubmit={handlerSenhaSubmit} onBlur={limpaCampo} className={style.form_altera_senha} noValidate>
                        <div className={style.divs_input}>
                            <label htmlFor="">Senha Atual</label>
                            <input type="password" id="senha_atual" onChange={handlerSenhaChange}/>
                        </div>
                        <div className={style.divs_input}>
                            <label htmlFor="">Nova Senha</label>
                            <input type="password" id="nova_senha" onChange={handlerSenhaChange}/>
                        </div>
                        <div className={style.div_buttons_senha}>
                            <button className={style.btns} onClick={validaToken}>Alterar</button>
                            <button type="button" className={style.btns} onClick={() => setDeveExibirFormAlterarSenha(false)}>Cancelar</button>
                        </div>
                    </form>
                </div>
            }
        </div>
    );
}