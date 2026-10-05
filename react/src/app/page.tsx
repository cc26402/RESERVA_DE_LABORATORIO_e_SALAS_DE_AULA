"use client";

import { useEffect, useState } from "react";
import style from "./page.module.css"

interface DadosDosAmbientes {
  idAmbiente: number;
  nome: string;
  capacidade: number;
  idPredio: number;
  andar: number;
  idTipo: number;
}

export default function Ambiente() {
  const [dados, setDados] = useState<DadosDosAmbientes[]>([]);
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

  function handlePredioChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setIdSelecionado(Number(event.target.value));
  }

  const idsDosPredios = Array.from(new Set(dados.map((r) => r.idPredio)));

  const ambientesDoPredio = idPredioSelecionado === 0? dados.map((registro) => registro) : dados.filter((registro) => registro.idPredio === idPredioSelecionado);

  return (
    <div className={style.body}>
      <h2>Listagem dos Ambientes cadastrados no BD</h2>

      <div>
        <p>Prédio:</p>
        <select name="idPredio" value={idPredioSelecionado} onChange={handlePredioChange} className={style.selectPredio}>
          <option value={0}>Selecione...</option>
          {idsDosPredios.map((id) => (
            <option key={id} value={id}>
              Prédio {id}
            </option>
          ))}
        </select>
      </div>

      <br />
      <div>
        <div className={style.todosOsCards}>
          {ambientesDoPredio.map((a) => (
            <div key={a.idAmbiente} className={style.cardAmbiente}>
              <h4>{a.nome}</h4>
              <h4>{a.idTipo}</h4>
              <h2>Andar: {a.andar}</h2>
              <h2>capacidade: {a.capacidade}</h2>
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