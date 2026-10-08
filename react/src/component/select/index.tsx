import style from "./Select.module.css";

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
    defaultValue?: string | number,
    onChange?: (evento: React.ChangeEvent<HTMLSelectElement>) => void
}

export function Select({opcoes, chaveValor, chaveTexto, textoPadrao, textoOptionPadrao, valorOptionPadrao = 0, id, name, value, onChange, defaultValue}: SelectProps){

    const chavesUnicas = new Set();
    const opcoesSemRepetidos = opcoes.filter(opcao => {
        const chave = opcao[chaveValor];
        if (chavesUnicas.has(chave)) return false;
        chavesUnicas.add(chave);
        return true;
    })
    
    return (
        <select name={name} id={id} onChange={onChange} value = {value} defaultValue={defaultValue} className={style.select}>
            {textoOptionPadrao && (
                <option value={valorOptionPadrao}>{textoOptionPadrao}</option>
            )}
            {
                opcoesSemRepetidos.map(opcao => (
                    <option key={opcao[chaveValor]} value={opcao[chaveValor]}>{textoPadrao ? textoPadrao + " " + opcao[chaveTexto] : opcao[chaveTexto]}</option>
                ))
            }
        </select>
    )
}