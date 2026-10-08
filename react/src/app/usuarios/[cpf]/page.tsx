import FrmUsuario from "@/src/component/frmusuario";

export default async function Page({params}:{params:Promise<{cpf: string}>}){
    const { cpf } = await params;

    return (
        <FrmUsuario cpf={cpf}></FrmUsuario>
    )
}