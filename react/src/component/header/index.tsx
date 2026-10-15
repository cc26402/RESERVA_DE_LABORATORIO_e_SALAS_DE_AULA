'use client';
import Link from "next/link";
import style from "./Header.module.css";
import { useRouter } from "next/navigation";

export function Header() {
  const router = useRouter();
  function logoutHandler(){
    localStorage.removeItem("loginToken");
    router.replace('/')
  }

  return (
    <header className={style.header}>
      <div className={style.titulo}>
        <img
          src="https://www.cotuca.unicamp.br/wp-content/uploads/sites/75/2015/08/cotuca_transparente_logo.png"
          alt="Logo COTUCA Unicamp"
          className={style.logoCotuca}
        />
        <h1>Reserva de Salas e Laboratórios</h1>
      </div>
      <nav>
        <ul className={style.menu}>
          <li className={style.linkMenu}>
            <Link href="/">Home</Link>
          </li>
          <li className={style.linkMenu}>
            <Link href="/reservas">Minhas reservas</Link>
          </li>
          <li className={style.linkMenu}>
            <Link href="/usuarios/meusdados">Meus dados</Link>
          </li>
          <li className={style.linkMenu}>
            <Link href="/ambientes">Ambientes</Link>
          </li>
          <li className={style.linkMenu}>
            <button onClick={logoutHandler}>Logout</button>
          </li>
        </ul>
      </nav>
    </header>
  );
}