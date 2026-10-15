"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {

  const [status, setStatus] = useState("");
  const [token, setToken] = useState("");
  const router = useRouter();
  
  useEffect(() => {
    const loginToken = localStorage.getItem("loginToken");
    if (loginToken) {
      fetch("http://localhost:8080/auth/valida", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${loginToken}`
        }
      })
      .then(async result => {
        if (!result.ok) {
          localStorage.removeItem('loginToken');
        }
        else {
          router.replace("/home")
        }
      })
    }
  }, [router, token])
  
  function submitHandler(evento) {
    evento.preventDefault();
    const email = document.getElementById("email");
    const senha = document.getElementById("senha");

    if (validaDados(email, senha)) {
      const dadosLogin = {username: email.value, senha: senha.value};
      fetch("http://localhost:8080/auth/login",{
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosLogin)
      })
      .then(async result => {
        const dados = await result.json();
        if (!result.ok) {
          alert(dados.message);
          throw new Error(dados.message);
        }
        localStorage.setItem('loginToken', dados.token);
        localStorage.setItem('loginCPF', dados.dadosLogin.CPF);
        localStorage.setItem('loginUsername', dados.dadosLogin.username);
        setToken(dados.token)
      })
      .catch(erro => setStatus(erro.message));
    }
  }
  
  function validaDados(email, senha) {
    let tudoOk = true;

    if (email.value == "" || !email.value.includes("@")) {
      email.style.border="1px solid red";
      tudoOk = false;
    }

    if (senha.value == "") {
      senha.style.border = "1px solid red";
      tudoOk = false;
    }

    return tudoOk;
  }

  function onBlurHandler(evento) {
    const input = document.getElementById(evento.target.id);
    input.style.border = "";

  }

  return (
    <form onSubmit={submitHandler}>
      <h1>Login</h1>
      <div>
        <label htmlFor="">E-mail</label>
        <input type="text" name="email" id="email" onBlur={onBlurHandler}/>
      </div>
      <div>
        <label htmlFor="">Senha</label>
        <input type="text" name="senha" id="senha" onBlur={onBlurHandler}/>
      </div>
      <button>Entrar</button>
      <Link href="/usuarios/novo"></Link>
    </form>
  );
}