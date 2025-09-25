"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { ThemeSwitcher } from './ThemeSwitcher';

import type { NavLink } from '../lib/nav';

type HeaderProps = { navLinks: NavLink[] };

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
  <div className="container-fluid">
          <Link className="navbar-brand" href="/">Navbar Dinâmica</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {navLinks.map(link => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href + '/'));
                if (link.subLinks && link.subLinks.length > 0) {
                  return (
                    <li key={link.href} className="nav-item dropdown">
                      <button
                        className={`nav-link dropdown-toggle ${isActive ? 'active' : ''}`}
                        id={`dropdown-${link.href}`.replace(/\//g, '-')}
                        data-bs-toggle="dropdown"
                        aria-expanded={isActive}
                        aria-haspopup="true"
                        type="button"
                      >
                        {link.label}
                      </button>
                      <ul className="dropdown-menu" aria-labelledby={`dropdown-${link.href}`.replace(/\//g, '-')}> 
                        {link.hasPage && (
                          <>
                            <li>
                              <Link className="dropdown-item" href={link.href}>{link.label} (Principal)</Link>
                            </li>
                            <li><hr className="dropdown-divider" /></li>
                          </>
                        )}
                        {link.subLinks.map(sub => {
                          const subActive = pathname === sub.href || pathname.startsWith(sub.href + '/');
                          return (
                            <li key={sub.href}>
                              <Link className={`dropdown-item ${subActive ? 'active' : ''}`} href={sub.href}>{sub.label}</Link>
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                  );
                }
                return (
                  <li key={link.href} className="nav-item">
                    <Link className={`nav-link ${isActive ? 'active' : ''}`} href={link.href} aria-current={isActive ? 'page' : undefined}>{link.label}</Link>
                  </li>
                );
              })}
            </ul>
            <form className="d-flex" role="search" onSubmit={(e) => e.preventDefault()}>
              <input className="form-control me-2" type="search" placeholder="Pesquisar (não funcional)" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit" disabled>Buscar</button>
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