import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { Header } from '../Header';
import { ThemeProvider } from '../ThemeProvider';
import type { NavLink } from '../../lib/nav';

vi.mock('next/navigation', () => ({ usePathname: () => '/' }));

const links: NavLink[] = [
  { href: '/teste', label: 'Teste', hasPage: true },
  { href: '/animejs', label: 'Animejs', hasPage: true }
];

describe('Header', () => {
  it('renderiza links principais', () => {
    render(
      <ThemeProvider attribute="data-theme" defaultTheme="light">
        <Header navLinks={links} />
      </ThemeProvider>
    );
    expect(screen.getByText('Teste')).toBeInTheDocument();
    expect(screen.getByText('Animejs')).toBeInTheDocument();
  });
});
