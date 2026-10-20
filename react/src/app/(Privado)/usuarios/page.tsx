"use client";
import { Tabela } from "@/src/component/tabela";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import style from './page.module.css';

interface Usuario {
    CPF: string,
    prenome: string,
    sobrenome: string,
    celular: string,
    email: string
}


export default function Usuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [erro, setErro] = useState("");
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
            router.replace("/")
            }
            else {
              alert("Necessário estar logado para acessar esse recurso");
                setToken(loginToken);
            }
        })
        }
        else {
          alert("Necessário estar logado para acessar esse recurso");
            router.replace("/");
        }
    }, [router]);

    useEffect(() => {
        fetch("http://localhost:8080/usuarios")
        .then(async result => {
            const dados = await result.json();
            if (!result.ok) {
                const erroMsg = dados.message;
                throw new Error(`Erro ao buscar dados dos usuarios: ${erroMsg}`);
            }
            setUsuarios(dados);
        })
        .catch(erro => setErro(erro.message))
    },[]);
    const titulos = ["CPF", "Nome", "Celular", "E-mail", ""];
    const usuariosFormatados = usuarios.map((usuario: Usuario) => ({CPF: usuario.CPF, nome_completo: `${usuario.prenome} ${usuario.sobrenome}`, celular: usuario.celular, email: usuario.email}));
    const listaOrdemChaves = ["CPF", "nome_completo", "celular", "email", "link"]
    const links = [{
        textoLink: "Editar",
        href: "/usuarios",
        rotaDinamica: true
    }]
    return (
        <main className={style.body}>
            <Link href="/usuarios/novo" className={style.button}>Novo usuario</Link>
            <Tabela titulos={titulos} listaOrdemChaveDados={listaOrdemChaves} dados={usuariosFormatados} links={links} chavePrimaria={"CPF"}></Tabela>
        </main>
    )
}