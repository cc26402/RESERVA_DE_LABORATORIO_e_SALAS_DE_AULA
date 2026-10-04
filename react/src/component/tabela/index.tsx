import { Thead } from "./thead"
import { Tbody } from "./tbody"

interface TabelaProps {
    titulos: string[]
    dados: (string|number)[][]
}

export function Tabela({titulos, dados}: TabelaProps){
    <table>
        <Thead titulos={titulos}></Thead>
        <Tbody dados={dados}></Tbody>
    </table>
}