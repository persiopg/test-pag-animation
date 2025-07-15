"use client";

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { FaSun, FaMoon, FaDesktop } from 'react-icons/fa';

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Garante que o componente só é renderizado no cliente para evitar 'hydration mismatch'.
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // ou um placeholder de carregamento
  }

  return (
    <div className="dropdown">
      <button 
        className="btn btn-secondary dropdown-toggle" 
        type="button" 
        id="themeDropdown" 
        data-bs-toggle="dropdown" 
        aria-expanded="false"
      >
        {theme === 'light' && <FaSun />}
        {theme === 'dark' && <FaMoon />}
        {theme === 'system' && <FaDesktop />}
        <span className="visually-hidden">Mudar tema</span>
      </button>
      <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="themeDropdown">
        <li>
          <button className="dropdown-item d-flex align-items-center" onClick={() => setTheme('light')}>
            <FaSun className="me-2" /> Claro
          </button>
        </li>
        <li>
          <button className="dropdown-item d-flex align-items-center" onClick={() => setTheme('dark')}>
            <FaMoon className="me-2" /> Escuro
          </button>
        </li>
        <li>
          <button className="dropdown-item d-flex align-items-center" onClick={() => setTheme('system')}>
            <FaDesktop className="me-2" /> Sistema
          </button>
        </li>
      </ul>
    </div>
  );
}