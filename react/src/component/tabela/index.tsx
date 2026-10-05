import { Thead } from "./thead";
import { Tbody } from "./tbody";
interface TabelaProps {
    titulos: string[],
    listaOrdemChaveDados: string[],
    chavePrimaria?: string | number,
    dados: Record<string, string | number>[],
    botoes?: DadosBotoes[]
}

interface DadosBotoes {
    textoBotao: string,
    onClick: (...args: (number|string)[]) => void
}

export function Tabela({titulos, listaOrdemChaveDados, chavePrimaria, dados, botoes} : TabelaProps){
    return (
        <table>
            <Thead titulos={titulos}></Thead>
            <Tbody dados={dados} listaOrdemChaveDados={listaOrdemChaveDados} chavePrimaria = {chavePrimaria} botoes={botoes}></Tbody>
        </table>
    )
}