'use client';
import FrmUsuario from "@/src/component/frmusuario";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Page(){
    const [token, setToken] = useState("");
    const router = useRouter();
    
    useEffect(() => {
        const loginToken = localStorage.getItem("loginToken");
        if (loginToken) {
        fetch("http://localhost:8080/auth/valida", {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${loginToken}`
            }
        })
        .then(async result => {
            if (!result.ok) {
            localStorage.removeItem('loginToken');
            router.replace("/")
            }
            else {
                setToken(loginToken);
            }
        })
        }
        else {
            router.replace("/");
        }
    }, [router]);

    return (
        <FrmUsuario token={token}></FrmUsuario>
    )
}