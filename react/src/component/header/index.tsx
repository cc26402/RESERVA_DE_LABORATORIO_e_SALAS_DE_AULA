import Link from "next/link";
import styles from "./Header.module.css";

export function Header() 
{
  return (
    <header>
      <div>
        <div>
          <h1>
            Reserva de Salas e Laboratórios
          </h1>
        </div>
      </div>
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/reservas">Reservas</Link>
          </li>
          <li>
            <Link href="/usuarios">Usuários</Link>
          </li>
          <li>
            <Link href="/ambientes">Salas e Laboratórios</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}