import Link from "next/link";
import style from "./Header.module.css";

export function Header() {
  return (
    <header className={style.header}>
      <div className={style.titulo}>
        <img src="https://www.cotuca.unicamp.br/wp-content/uploads/sites/75/2015/08/cotuca_transparente_logo.png" className={style.logoCotuca}></img>
        <h1>Reserva de Salas e Laboratórios</h1>
      </div>
      <nav>
        <ul className={style.menu}>
          <li className={style.linkMenu}><Link href="/">Home</Link></li>
          <li className={style.linkMenu}><Link href="/reservas">Minhas reservas</Link></li>
          <li className={style.linkMenu}><Link href="/usuarios">Meus Dados</Link></li>
          <li className={style.linkMenu}><Link href="/ambientes">Ambientes</Link></li>
        </ul>
      </nav>
    </header>
  );
}