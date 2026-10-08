"use client";

import { useEffect, useState } from "react";
import style from "./page.module.css"
import { Select } from "../component/select";

type DadosDosAmbientes = {
  idAmbiente: number;
  nome: string;
  capacidade: number;
  idPredio: number;
  andar: number;
  idTipo: number;
};

type DadosDosPredios = {
  idPredio: number;
  nome: string;
}

export default function Ambiente() {
  const [dados, setDados] = useState<DadosDosAmbientes[]>([]);
  const [predios, setPredios] = useState<DadosDosPredios[]>([]);
  const [idPredioSelecionado, setIdSelecionado] = useState<number>(0);

  useEffect(() => {
    async function carregarDadosDosAmbientes() {
      try {
        const response = await fetch("http://localhost:8080/ambientes");
        if (!response.ok) {
          throw new Error("Erro ao trazer os dados do BD");
        }
        const resultados: DadosDosAmbientes[] = await response.json();
        console.log("Dados vindo do JSON da API");
        console.log(resultados);
        setDados(resultados);
      } catch (erro) {
        console.error("Erro do processamento", erro);
      }
    }
    carregarDadosDosAmbientes();
  }, []);

  useEffect(() => {
    async function carregarDadosPredios() {
      try {
        const response = await fetch("http://localhost:8080/predios");
        if (!response.ok) {
          throw new Error("Erro ao trazer os dados do BD");
        }
        const resultados: DadosDosPredios[] = await response.json();
        console.log("Dados vindo do JSON da API");
        console.log(resultados);
        setPredios(resultados);
      }
      catch (erro) {
        console.error("Erro do processamento", erro);
      }
    }
    carregarDadosPredios();
  }, [])

  const ambientesDoPredio = idPredioSelecionado === 0? dados.map((registro) => registro) : dados.filter((registro) => registro.idPredio === idPredioSelecionado);

  return (
    <div className={style.body}>
      <div className={style.submenu}>
        <h2>Listagem dos Ambientes cadastrados no BD</h2>
        <div className={style.divSelect}>
          <p>Prédio:</p>
          <select value={idPredioSelecionado} onChange={(e) => setIdSelecionado(Number(e.target.value))} className={style.selectPredio}>
            <option value={0}>Todos os prédios</option>
            {predios.map((p) => (
              <option key={p.idPredio} value={p.idPredio}>
                {p.nome}
              </option>
            ))}
        </select>
      </div>
      </div>

      <br />
      <div>
        <div className={style.todosOsCards}>
          {ambientesDoPredio.map((a) => (
            <div key={a.idAmbiente} className={style.cardAmbiente}>
              <h1>{a.nome}</h1>
              <div>
                <h2>Tipo: {a.idTipo == 1? "Sala" : "Laboratório"}</h2>
                <hr></hr>
                <h2>Andar: {a.andar}</h2>
                <hr></hr>
                <h2>capacidade: {a.capacidade}</h2>
                <hr></hr>
              </div>
              <button>RESERVAR</button>
            </div>
          ))}
        </div>

        {idPredioSelecionado === 0 && (
          <p>Selecione um prédio para ver os ambientes.</p>
        )}

        {idPredioSelecionado !== 0 && ambientesDoPredio.length === 0 && (
          <p>Nenhum ambiente encontrado.</p>
        )}
      </div>

      <br />
      <br />
    </div>
  );
}