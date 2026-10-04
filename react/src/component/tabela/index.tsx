import { Thead } from "./thead";
import { Tbody } from "./tbody";
interface TabelaProps {
    titulos: string[],
    listaOrdemChaveDados: string[],
    dados: Record<string, string | number>[]
}

export function Tabela({titulos, listaOrdemChaveDados, dados} : TabelaProps){
    return (
        <table>
            <Thead titulos={titulos}></Thead>
            <Tbody dados={dados} chavesDados={listaOrdemChaveDados}></Tbody>
        </table>
    )
}