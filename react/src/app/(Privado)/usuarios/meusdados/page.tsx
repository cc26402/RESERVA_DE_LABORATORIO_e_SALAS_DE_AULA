'use client';
import FrmUsuario from "@/src/component/frmusuario";
import { useEffect, useState } from "react";

export default function Page(){

    const [token, setToken] = useState("");

    useEffect(() => {
        setToken(localStorage.getItem("loginToken"));
    },[])

    return (
        <FrmUsuario token={token}></FrmUsuario>
    )
}