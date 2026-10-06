import { useEffect, useState } from "react";

export default function Ambiente(){
    return(
        <div>
            <div>
                <label>Operação: </label>
                <select>
                    <option>Listar</option>
                    <option>Adicionar</option>
                    <option>Excluir</option>
                    <option>Editar</option>
                </select>
            </div>

            <form></form>
        </div>
    )
}

function handleOperacaoChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setIdSelecionado(Number(event.target.value));
}