import { frmEditarReserva } from "@/src/component/frmEditarReserva";

export default async function editReserva({params}:{params:Promise<{idReserva: string}>}){
    const { idReserva } = await params;
    return(
        <frmEditarReserva idReserva={ idReserva }></frmEditarReserva>
    )
}