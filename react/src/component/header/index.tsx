import Link from "next/link";
import style from "./Header.module.css";

export function Header() {
  return (
    <header className={style.header}>
      <div className={style.titulo}>
        <img src="https://www.cotuca.unicamp.br/wp-content/uploads/sites/75/2015/08/cotuca_transparente_logo.png"></img>
        <h1>Reserva de Salas e Laboratórios</h1>
      </div>
      <nav className={style.menu}>
        <ul>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/reservas">Reservas</Link></li>
          <li><Link href="/usuarios">Usuários</Link></li>
          <li><Link href="/ambientes">Ambientes</Link></li>
          <li><Link href="/predios">Prédios</Link></li>
        </ul>
      </nav>
    </header>
  );
}