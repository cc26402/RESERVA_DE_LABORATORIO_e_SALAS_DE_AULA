import Link from "next/link";

interface TbodyProps {
    dados: Record<string, string | number>[],
    listaOrdemChaveDados: string[],
    chavePrimaria?: string | number,
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

export function Tbody({dados, listaOrdemChaveDados, chavePrimaria, botoes, links}: TbodyProps){
    return (
        <tbody>
            {
                dados.map((dado, i) => {
                    let botaoAtual = 0;
                    let linkAtual = 0;
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
                                else if (chave=="link"){
                                    if (links == undefined) throw new Error("Foi pedido para gerar um link porém nenhuma chave primária para identificação ou dado de link foi passado")
                                    const link = links[linkAtual];
                                    linkAtual++
                                    if (link.rotaDinamica && chavePrimaria == undefined) throw new Error("Foi passado para gerar um Link com rota dinâmica porém chave primária está ausente")
                                    return (
                                        <td key={i2+"td"}>
                                            <Link href={link.href + (link.rotaDinamica ? "/" + link[chavePrimaria] : "")}>{link.textoLink}</Link>
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