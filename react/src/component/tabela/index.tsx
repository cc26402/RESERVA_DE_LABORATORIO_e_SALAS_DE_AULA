import { Thead } from "./thead";
import { Tbody } from "./tbody";

interface TabelaProps {
    titulos: string[],
    listaOrdemChaveDados: string[],
    chavePrimaria?: string | number,
    dados: Record<string, string | number>[],
    botoes?: DadosBotoes[],
    links?: DadosLinks[]
}

interface DadosBotoes {
    textoBotao: string,
    onClick: (...args: (number|string)[]) => void
}

interface DadosLinks {
    textoLink: string,
    href: string,
    rotaDinamica: boolean 
}

export function Tabela({titulos, listaOrdemChaveDados, chavePrimaria, dados, botoes, links} : TabelaProps){
    return (
        <table>
            <Thead titulos={titulos}></Thead>
            <Tbody dados={dados} listaOrdemChaveDados={listaOrdemChaveDados} chavePrimaria = {chavePrimaria} botoes={botoes} links={links}></Tbody>
        </table>
    )
}