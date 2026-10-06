interface TbodyProps {
    dados: Record<string, string | number>[],
    listaOrdemChaveDados: string[],
    chavePrimaria?: string | number,
    botoes?: DadosBotoes[]
}

interface DadosBotoes {
    textoBotao: string,
    onClick: (...args: (number|string)[]) => void
}

export function Tbody({dados, listaOrdemChaveDados, chavePrimaria, botoes}: TbodyProps){
    return (
        <tbody>
            {
                dados.map((dado, i) => {
                    let botaoAtual = 0;
                    return (
                        <tr key={chavePrimaria!=undefined ? dado[chavePrimaria] : i+"tr"}>
                            {listaOrdemChaveDados.map((chave, i2) => {
                                if (chave=="botão" || chave=="botao"){
                                    if (botoes == undefined || chavePrimaria==undefined) throw new Error("Foi pedido para gerar um botão porém nenhuma chave primária para identificação ou dado de botão foi passado")
                                    const botao = botoes[botaoAtual];
                                    botaoAtual++
                                    return (
                                        <td key={i2+"td"}>
                                            <button onClick={() => botao.onClick(dado[chavePrimaria])}>{botao.textoBotao}</button>
                                        </td>
                                    )
                                    
                                }
                                return (
                                    <td key={i2+"td"}>{dado[chave]}</td>
                                );
                            })}
                        </tr>
                )})
            }
        </tbody>
    );
}