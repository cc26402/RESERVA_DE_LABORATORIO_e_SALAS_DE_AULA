interface SelectProps {
    opcoes: Record<string, string | number>[],
    chaveValor: string,
    chaveTexto: string,
    id?: string,
    name?: string
}

export function Select({opcoes, chaveValor, chaveTexto, id, name}: SelectProps){
    return (
        <select name={name ? name : ""} id={id ? id : ""}>
            {
                opcoes.map(opcao => (
                    <option key={opcao[chaveValor]} value={opcao[chaveValor]}>{opcao[chaveTexto]}</option>
                ))
            }
        </select>
    )
}