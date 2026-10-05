interface SelectProps {
    opcoes: Record<string, string | number>[],
    chaveValor: string,
    chaveTexto: string,
    id?: string,
    name?: string,
    onChange?: (evento: React.ChangeEvent<HTMLSelectElement>) => void
}

export function Select({opcoes, chaveValor, chaveTexto, id, name, onChange}: SelectProps){
    return (
        <select name={name ? name : ""} id={id ? id : ""} onChange={onChange}>
            {
                opcoes.map(opcao => (
                    <option key={opcao[chaveValor]} value={opcao[chaveValor]}>{opcao[chaveTexto]}</option>
                ))
            }
        </select>
    )
}