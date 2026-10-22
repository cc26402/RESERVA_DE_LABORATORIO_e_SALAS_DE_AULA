import { FrmEditarReserva } from "@/src/component/frmEditarReserva";

export default async function editReserva({ params }: { params: Promise<{ idReservas: string }> }) {
    const { idReservas } = await params;
    return <FrmEditarReserva idReserva={idReservas} />;
}