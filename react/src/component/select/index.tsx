interface SelectProps {
    opcoes: Record<string, string | number>[],
    chaveValor: string,
    chaveTexto: string,
    textoPadrao?: string;
    textoOptionPadrao?: string,
    valorOptionPadrao?: string | number;
    id?: string,
    name?: string,
    value?: string | number
    className?: string,
    onChange?: (evento: React.ChangeEvent<HTMLSelectElement>) => void
}

export function Select({opcoes, chaveValor, chaveTexto, textoPadrao,textoOptionPadrao , valorOptionPadrao = 0, id, name, value, className, onChange}: SelectProps){
    return (
        <select name={name} id={id} onChange={onChange} value = {value} className={className}>
            {textoOptionPadrao && (
                <option value={valorOptionPadrao}>{textoOptionPadrao}</option>
            )}
            {
                opcoes.map(opcao => (
                    <option key={opcao[chaveValor]} value={opcao[chaveValor]}>{textoPadrao ? textoPadrao + " " + opcao[chaveTexto] : opcao[chaveTexto]}</option>
                ))
            }
        </select>
    )
}