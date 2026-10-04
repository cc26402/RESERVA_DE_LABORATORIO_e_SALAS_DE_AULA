interface TbodyProps {
    dados: Record<string, string | number>[],
    chavesDados: string[]
}

export function Tbody({dados, chavesDados}: TbodyProps){
    return (
        dados.map((dado, i) => (
            <tr key={i+"tr"}>
                {chavesDados.map((chave, i2) => {
                    return (
                        <td key={i2+"td"}>{dado[chave]}</td>
                    );
                })}
            </tr>
        ))
    );
}