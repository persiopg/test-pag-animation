"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { ThemeSwitcher } from './ThemeSwitcher';

type NavLink = {
  href: string;
  label: string;
  hasPage: boolean;
  subLinks?: NavLink[];
};

type HeaderProps = {
  navLinks: NavLink[];
};

export function Header({ navLinks = [] }: HeaderProps) {
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header>
      <nav 
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
              {navLinks.map((link) => {
                const isDropdownActive = link.subLinks && pathname.startsWith(link.href);

                // Se o link tiver sub-links, renderiza um dropdown
                if (link.subLinks && link.subLinks.length > 0) {
                  return (
                    <li key={link.href} className="nav-item dropdown">
                      <a
                        className={`nav-link dropdown-toggle ${isDropdownActive ? 'active' : ''}`}
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {link.label}
                      </a>
                      <ul className="dropdown-menu">
                        {/* Se a pasta pai for uma página, adiciona o link para ela aqui */}
                        {link.hasPage && (
                          <>
                            <li>
                              <Link className="dropdown-item" href={link.href}>
                                {link.label} (Página Principal)
                              </Link>
                            </li>
                            <li><hr className="dropdown-divider" /></li>
                          </>
                        )}
                        {/* Mapeia e renderiza os sub-links */}
                        {link.subLinks.map((subLink) => (
                          <li key={subLink.href}>
                            <Link className="dropdown-item" href={subLink.href}>
                              {subLink.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  );
                }

                // Caso contrário, renderiza um link simples
                const isActive = pathname === link.href;
                return (
                  <li key={link.href} className="nav-item">
                    <Link
                      className={`nav-link ${isActive ? 'active' : ''}`}
                      href={link.href}
                      aria-current={isActive ? 'page' : undefined}
                    >
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