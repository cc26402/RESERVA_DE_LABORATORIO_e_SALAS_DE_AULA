"use client"
import FrmNovaReserva from "@/src/component/frmNovaReserva";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function FormNovaReserva(){

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
              alert("Necessário estar logado para acessar esse recurso");
                setToken(loginToken);
            }
        })
        }
        else {
          alert("Necessário estar logado para acessar esse recurso");
            router.replace("/");
        }
    }, [router]);

    return(
        <FrmNovaReserva></FrmNovaReserva>
    );
}