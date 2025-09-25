"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { ThemeSwitcher } from './ThemeSwitcher';

type NavLink = { href: string; label: string; hasPage: boolean; subLinks?: NavLink[]; };
type HeaderProps = { navLinks: NavLink[]; };

export function Header({ navLinks = [] }: HeaderProps) {
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // AQUI ESTÁ A NOVA LÓGICA:
  // 1. Criamos um estado para controlar se a página foi rolada.
  const [scrolled, setScrolled] = useState(false);

  // 2. Usamos um useEffect para adicionar um "ouvinte" de scroll.
  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      // Se a posição de scroll for maior que 10px, mudamos o estado.
      setScrolled(window.scrollY > 10);
    };

    // Adicionamos o ouvinte quando o componente é montado.
    window.addEventListener('scroll', handleScroll);

    // 3. Removemos o ouvinte quando o componente é desmontado para evitar leaks de memória.
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // O array vazio garante que isto só corre uma vez.

  return (
    <header>
      <nav 
        // 4. As classes da navbar agora são dinâmicas.
        className={`navbar navbar-expand-lg fixed-top ${scrolled ? 'navbar-scrolled' : 'navbar-transparent'}`}
        data-bs-theme={mounted ? resolvedTheme : undefined}
      >
        <div className="container">
          <Link className="navbar-brand" href="/">Navbar Dinâmica</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {navLinks.map(link => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href + '/'));

                // Caso tenha subLinks, renderiza dropdown
                if (link.subLinks && link.subLinks.length > 0) {
                  return (
                    <li key={link.href} className="nav-item dropdown">
                      <Link
                        className={`nav-link dropdown-toggle ${isActive ? 'active' : ''}`}
                        href={link.hasPage ? link.href : '#'}
                        id={`dropdown-${link.href}`.replace(/\//g, '-')}
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {link.label}
                      </Link>
                      <ul className="dropdown-menu" aria-labelledby={`dropdown-${link.href}`.replace(/\//g, '-')}> 
                        {link.subLinks.map(sub => {
                          const subActive = pathname === sub.href || (sub.href !== '/' && pathname.startsWith(sub.href + '/'));
                          return (
                            <li key={sub.href}>
                              <Link className={`dropdown-item ${subActive ? 'active' : ''}`} href={sub.href}>
                                {sub.label}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                  );
                }

                // Link simples
                return (
                  <li key={link.href} className="nav-item">
                    <Link className={`nav-link ${isActive ? 'active' : ''}`} href={link.href}>
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Pesquisar" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Buscar</button>
            </form>
            <div className="ms-3">
              <ThemeSwitcher />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}