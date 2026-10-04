interface TheadProps{
    titulos: string[]
}

export function Thead({titulos}: TheadProps) {
    return (
        <thead>
            <tr>
                {
                    titulos.map((titulo, i) => (
                        <th key={i}>{titulo}</th>
                    ))
                }
            </tr>
        </thead>
    );
}