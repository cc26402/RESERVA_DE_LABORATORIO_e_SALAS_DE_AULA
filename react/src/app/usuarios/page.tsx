"use client";
import { Tabela } from "@/src/component/tabela"
import { useEffect, useState } from "react"
import Link from "next/link";

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
    const titulos = ["CPF", "Nome", "Celular", "E-mail"];
    const usuariosFormatados = usuarios.map((usuario: Usuario) => ({CPF: usuario.CPF, nome_completo: `${usuario.prenome} ${usuario.sobrenome}`, celular: usuario.celular, email: usuario.email}));
    const listaOrdemChaves = ["CPF", "nome_completo", "celular", "email", "link"]
    const links = [{
        textoLink: "Editar",
        href: "/usuarios",
        rotaDinamica: true
    }]
    return (
        <main>
            <Link href="/usuarios/novo">Novo usuario</Link>
            <Tabela titulos={titulos} listaOrdemChaveDados={listaOrdemChaves} dados={usuariosFormatados} links={links} chavePrimaria={"CPF"}></Tabela>
        </main>
    )
}