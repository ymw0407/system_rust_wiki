import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import * as s from "./Layout.css";

interface LayoutProps {
  kicker?: string;
  title: string;
  subtitle?: string;
  showBackToToc?: boolean;
  children: ReactNode;
}

export function Layout({
  kicker,
  title,
  subtitle: sub,
  showBackToToc = true,
  children,
}: LayoutProps) {
  return (
    <>
      <header className={s.header}>
        {kicker && <div className={s.kicker}>{kicker}</div>}
        <h1 className={s.headerTitle}>{title}</h1>
        {sub && <p className={s.subtitle}>{sub}</p>}
      </header>
      <main className={s.main}>
        {showBackToToc && (
          <Link className={s.backToToc} to="/">
            ← 목차로 돌아가기
          </Link>
        )}
        {children}
      </main>
      <footer className={s.footer}>
        2026 · 소프트웨어 최신 기술 · Rust Course Wiki
      </footer>
    </>
  );
}

export function Lede({ children }: { children: ReactNode }) {
  return <p className={s.lede}>{children}</p>;
}
