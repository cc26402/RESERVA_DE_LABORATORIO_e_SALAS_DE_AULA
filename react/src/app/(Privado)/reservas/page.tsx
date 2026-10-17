"use client"
import { useState, useEffect } from "react";
import style from "./reservas.module.css";
import { Tabela } from "../../../component/tabela";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Reserva = {
    idReserva: number;
    username: string;
    idAmbiente: number; 
    idStatus: number; 
    dataInicial: string;
    dataFinal: string;
    horarioInicial: string;
    horarioFinal: string
};

type EstadoTabela = {
    modo: "Todas" | "User";
    dados?: Reserva;
};

export default function Reservas(){
    const [reserva, setReserva] = useState<Reserva[]>([]);
    const [tabela, setTabela] = useState<EstadoTabela>();
    const [formatadas, setFormatadas] = useState<Reserva[]>([]);
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
                setToken(loginToken);
            }
        })
        }
        else {
            router.replace("/");
        }
    }, [router]);

    useEffect(() => {
        async function listarReservasDoUsuario() {
            try{
                const response = await fetch("http://localhost:8080/reservas");
                const listaDeReservas = await response.json();
                setReserva(listaDeReservas);
            }
            catch(erro){
                throw new Error("falha ao conectar ao BD " + erro);
            }
        }
        listarReservasDoUsuario();
    }, [])

    async function carregarReservas(modo: "Todas" | "User"){
        try{
            const url = modo === "User"
                ? "http://localhost:8080/reservas/minhas"
                : "http://localhost:8080/reservas";
            const response = await fetch(url, {
                headers: { "Authorization": `Bearer ${localStorage.getItem("loginToken")}` }
            });
            if (!response.ok) {
                console.error("Erro ao buscar reservas:", response.status);
                return;
            }
            setReserva(await response.json());
            setTabela({modo});
        }
        catch(erro){
            console.error("Falha ao conectar ao BD", erro);
        }
    }

    async function excluir(idReserva: number | string){
        try{
            const response = await fetch("http://localhost:8080/reservas/"+ idReserva, {
                method : "DELETE",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("loginToken")}`
                }
            });
            if (response.ok){
                setReserva(reserva.filter(res => res.idReserva !== idReserva));
            }
            else{
                console.error("Erro ao excluir reserva:", response.status);
            }
        }
        catch (erro){
            console.error("Erro ao excluir reserva:", erro);
        }
    }

    useEffect(() => {
        setTabela({modo: "User"})
    }, [])
    
    useEffect(() => {
        setFormatadas(reserva.map(r => ({ ...r, dataInicial: formatarData(r.dataInicial),
                                                dataFinal: formatarData(r.dataFinal),
                                                horarioInicial: r.horarioInicial.slice(11, 16),
                                                horarioFinal: r.horarioFinal.slice(11, 16), })));
    }, [reserva]);

    function formatarData(data: string) {
        const [ano, mes, dia] = data.slice(0, 10).split("-");
        return `${dia}/${mes}/${ano}`;
    }

    return(
        <div>
            <header>
                <div>
                    <button onClick={() => carregarReservas("Todas")}>Mostrar Todas</button>
                    <button onClick={() => carregarReservas("User")}>Minhas Reservas</button>
                </div>
                <div>
                    <Link href="/reservas/novaReserva">Nova Reserva</Link>
                </div>
            </header>
            <main>
                {tabela?.modo == "User" && (
                    <Tabela titulos={["idReserva", "idAmbiente", "Status", "Data Inicial", "Data Final", "Horário Inicial", "Horario Final", " ", " "]} 
                        listaOrdemChaveDados={["idReserva", "idAmbiente", "idStatus", "dataInicial", "dataFinal", "horarioInicial", "horarioFinal", "link", "botao"]} 
                        chavePrimaria={"idReserva"} 
                        dados={formatadas} 
                        botoes={[{textoBotao: "Excluir", onClick: excluir}]} 
                        links={[{textoLink: "Editar", href: "/reservas", rotaDinamica: true}]}>
                    </Tabela>
                    )
                }
                {
                    tabela?.modo == "Todas" && (
                        <Tabela titulos={["idReserva", "idAmbiente", "Status", "Data Inicial", "Data Final", "Horário Inicial", "Horario Final"]} 
                        listaOrdemChaveDados={["idReserva", "idAmbiente", "idStatus", "dataInicial", "dataFinal", "horarioInicial", "horarioFinal"]} 
                        chavePrimaria="idReserva" 
                        dados={formatadas}>
                        </Tabela>
                    )
                }
            </main>
        </div>
    );
}