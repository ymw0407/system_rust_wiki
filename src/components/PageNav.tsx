import { Link } from "react-router-dom";
import * as s from "./PageNav.css";

interface PageNavProps {
  prev?: { to: string; label?: string };
  next?: { to: string; label?: string };
}

export function PageNav({ prev, next }: PageNavProps) {
  return (
    <nav className={s.nav}>
      {prev ? (
        <Link className={s.link} to={prev.to}>
          ← {prev.label ?? "이전"}
        </Link>
      ) : (
        <span />
      )}
      <Link className={s.link} to="/">
        목차
      </Link>
      {next ? (
        <Link className={s.link} to={next.to}>
          {next.label ?? "다음"} →
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
