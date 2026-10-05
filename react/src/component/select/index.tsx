interface SelectProps {
    opcoes: Record<string, string | number>[],
    chaveValor: string,
    chaveTexto: string,
    textoPadrao?: string;
    valorPadrao?: string | number;
    id?: string,
    name?: string,
    value?: string | number
    className?: string,
    onChange?: (evento: React.ChangeEvent<HTMLSelectElement>) => void
}

export function Select({opcoes, chaveValor, chaveTexto, textoPadrao, valorPadrao = 0, id, name, value, className, onChange}: SelectProps){
    return (
        <select name={name} id={id} onChange={onChange} value = {value} className={className}>
            {textoPadrao && (
                <option value={valorPadrao}>{textoPadrao}</option>
            )}
            {
                opcoes.map(opcao => (
                    <option key={opcao[chaveValor]} value={opcao[chaveValor]}>{opcao[chaveTexto]}</option>
                ))
            }
        </select>
    )
}