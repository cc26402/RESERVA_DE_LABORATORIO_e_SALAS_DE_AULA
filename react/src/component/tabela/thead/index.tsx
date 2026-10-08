interface TheadProps{
    titulos: string[]
}
import style from "./Thead.module.css";

export function Thead({titulos}: TheadProps) {
    return (
        <thead className={style.thead}>
            <tr className={style.tr}>
                {
                    titulos.map((titulo, i) => (
                        <th key={i} className={style.th}>{titulo}</th>
                    ))
                }
            </tr>
        </thead>
    );
}