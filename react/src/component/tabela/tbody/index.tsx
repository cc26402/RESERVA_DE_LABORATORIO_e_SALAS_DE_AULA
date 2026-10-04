interface TbodyProps {
    dados: (string|number)[][]
}

export function Tbody({dados}: TbodyProps){
    return (
        dados.map((dado, i) => (
            <tr key={i+"tr"}>
                {dado.map((dadoInterno, i2) => {
                    return (
                        <td key={i2+"td"}>{dadoInterno}</td>
                    );
                })}
            </tr>
        ))
    );
}