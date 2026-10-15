"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Ambiente() {

  const [status, setStatus] = useState();
  
  function submitHandler(evento) {
    evento.preventDefault();
    const email = document.getElementById("email");
    const senha = document.getElementById("senha");

    if (validaDados(email, senha)) {
      fetch("http://localhost/8080/auth/login")
      .then(async result => {
        const dados = await result.json();
        if (!result.ok) {
          alert("Verifique os dados de login");
          throw new Erro("Verifique os dados de login");
        }
        console.log(dados)
      })
      .catch(erro => setStatus(erro.message));
    }
  }
  
  function validaDados(email, senha) {
    return true;
  }

  return (
    <form onSubmit={submitHandler}>
      <h1>Login</h1>
      <div>
        <label htmlFor="">E-mail</label>
        <input type="text" name="email" id="email"/>
      </div>
      <div>
        <label htmlFor="">Senha</label>
        <input type="text" name="senha" id="senha"/>
      </div>
      <button>Entrar</button>
      <Link href="/usuarios/novo"></Link>
    </form>
  );
}