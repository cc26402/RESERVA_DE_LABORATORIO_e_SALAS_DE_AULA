"use client"
import { useState, useEffect, useCallback } from "react";
import { Tabela as TabelaReservas } from "../../../component/tabela";
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
    horarioFinal: string;
};

type ReservaFormatada = {
    idReserva: number;
    username: string;
    ambiente: string;
    status: string;
    dataInicial: string;
    dataFinal: string;
    horarioInicial: string;
    horarioFinal: string;
};

type Ambiente = {
    idAmbiente: number;
    idPredio: number;
    nome: string;
    capacidade: number;
    andar: number;
    idTipo: number;
};

type EstadoTabela = {
    modo: "Todas" | "User";
};

type DataHora = { data: string; hora: string };

type Status = {
    idStatus: number;
    nome: string;
};

function formatarData(data: string) {
    const [ano, mes, dia] = data.slice(0, 10).split("-");
    return `${dia}/${mes}/${ano}`;
}

function calcularStatus(r: Reserva, agora: DataHora): number {
    if (r.idStatus === 3) return 3;

    const inicio = r.dataInicial.slice(0, 10) + " " + r.horarioInicial.slice(11, 16);
    const fim = r.dataFinal.slice(0, 10) + " " + r.horarioFinal.slice(11, 16);
    const agoraStr = agora.data.slice(0, 10) + " " + agora.hora.slice(0, 5);

    if (fim < agoraStr) return 1;
    if (inicio <= agoraStr) return 2;
    return 4;
}

export default function Reservas() {
    const [reserva, setReserva] = useState<Reserva[]>([]);
    const [ambiente, setAmbiente] = useState<Ambiente[]>([]);
    const [tabela, setTabela] = useState<EstadoTabela>({ modo: "User" });
    const [dadosTabela, setDadosTabela] = useState<ReservaFormatada[]>([]);
    const [token, setToken] = useState("");
    const [dataHora, setDataHora] = useState<DataHora>();
    const [status, setStatus] = useState<Status[]>([]);
    const router = useRouter();

    useEffect(() => {
        async function buscarStatus() {
            try {
                const response = await fetch("http://localhost:8080/status");
                if (!response.ok) {
                    console.error("Erro ao buscar Status:", response.status);
                    return;
                }
                const dados = await response.json();
                if (Array.isArray(dados)) setStatus(dados);
            } catch (erro) {
                console.error("Falha ao conectar ao BD", erro);
            }
        }
        buscarStatus();
    }, []);

    useEffect(() => {
        const loginToken = localStorage.getItem("loginToken");
        if (!loginToken) {
            router.replace("/");
            return;
        }
        fetch("http://localhost:8080/auth/valida", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${loginToken}`
            }
        }).then(result => {
            if (!result.ok) {
                localStorage.removeItem("loginToken");
                router.replace("/");
            } else {
                setToken(loginToken);
            }
        });
    }, [router]);

    useEffect(() => {
        async function listarAmbientes() {
            try {
                const response = await fetch("http://localhost:8080/ambientes");
                if (!response.ok) {
                    console.error("Erro ao buscar ambientes:", response.status);
                    return;
                }
                const listaDeAmbientes = await response.json();
                if (Array.isArray(listaDeAmbientes)) setAmbiente(listaDeAmbientes);
            } catch (erro) {
                console.error("Falha ao conectar ao BD", erro);
            }
        }
        listarAmbientes();
    }, []);

    useEffect(() => {
        async function buscarHorario() {
            try {
                const response = await fetch("http://localhost:8080/reservas/hora");
                if (!response.ok) {
                    console.error("Erro ao buscar hora:", response.status, await response.text());
                    return;
                }
                setDataHora(await response.json());
            } catch (erro) {
                console.error("Erro ao acessar Data e Hora do BD", erro);
            }
        }
        buscarHorario();
    }, []);

    const carregarReservas = useCallback(async (modo: "Todas" | "User") => {
        try {
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
            setTabela({ modo });
        } catch (erro) {
            console.error("Falha ao conectar ao BD", erro);
        }
    }, []);

    useEffect(() => {
        if (token) carregarReservas("User");
    }, [token, carregarReservas]);

    async function excluir(idReserva: number | string) {
        try {
            const response = await fetch("http://localhost:8080/reservas/" + idReserva, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("loginToken")}`
                }
            });
            if (response.ok) {
                setReserva(prev => prev.filter(res => res.idReserva !== Number(idReserva)));
            } else {
                console.error("Erro ao excluir reserva:", response.status);
            }
        } catch (erro) {
            console.error("Erro ao excluir reserva:", erro);
        }
    }

    useEffect(() => {
        if (!dataHora || status.length === 0) return;

        const formatadas: ReservaFormatada[] = reserva.map(r => {
            const amb = ambiente.find(a => a.idAmbiente === r.idAmbiente);
            return {
                idReserva: r.idReserva,
                username: r.username,
                ambiente: amb ? amb.nome : "Desconhecido",
                status: status.find(s => s.idStatus === calcularStatus(r, dataHora))?.nome ?? "Desconhecido",
                dataInicial: formatarData(r.dataInicial),
                dataFinal: formatarData(r.dataFinal),
                horarioInicial: r.horarioInicial.slice(11, 16),
                horarioFinal: r.horarioFinal.slice(11, 16),
            };
        });

        setDadosTabela(formatadas);
    }, [reserva, ambiente, dataHora, status]);

    return (
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
                {tabela.modo === "User" && (
                    <TabelaReservas
                        titulos={["idReserva", "Ambiente", "Status", "Data Inicial", "Data Final", "Horário Inicial", "Horario Final", " ", " "]}
                        listaOrdemChaveDados={["idReserva", "ambiente", "status", "dataInicial", "dataFinal", "horarioInicial", "horarioFinal", "link", "botao"]}
                        chavePrimaria={"idReserva"}
                        dados={dadosTabela}
                        botoes={[{ textoBotao: "Excluir", onClick: excluir }]}
                        links={[{ textoLink: "Editar", href: "/reservas", rotaDinamica: true }]}>
                    </TabelaReservas>
                )}
                {tabela.modo === "Todas" && (
                    <TabelaReservas
                        titulos={["idReserva", "Ambiente", "Status", "Data Inicial", "Data Final", "Horário Inicial", "Horario Final"]}
                        listaOrdemChaveDados={["idReserva", "ambiente", "status", "dataInicial", "dataFinal", "horarioInicial", "horarioFinal"]}
                        chavePrimaria="idReserva"
                        dados={dadosTabela}>
                    </TabelaReservas>
                )}
            </main>
        </div>
    );
}