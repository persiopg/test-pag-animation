import type { Metadata, Viewport } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';

import { Header } from './components/Header';
import BootstrapClient from './components/BootstrapClient';
import { ThemeProvider } from './components/ThemeProvider';
import { StructuredData } from './components/StructuredData';
import { Footer } from './components/Footer';

import { generateNavLinks } from './lib/nav';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
export const metadata: Metadata = {
  title: {
    default: 'Persio Godoy | Desenvolvedor Full-Stack',
    template: '%s | Persio Godoy'
  },
  description: 'Portfólio moderno com Next.js, animações e foco em performance e acessibilidade.',
  // Define cores do navegador (light/dark) para melhor integração PWA e Lighthouse
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0A192F' }
  ],
  keywords: [
    'Desenvolvedor Full-Stack',
    'React',
    'Next.js',
    'TypeScript',
    'Portfólio',
    'Web Performance'
  ],
  authors: [{ name: 'Persio Godoy' }],
  creator: 'Persio Godoy',
  publisher: 'Persio Godoy',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Persio Godoy | Desenvolvedor Full-Stack',
    description: 'Construindo interfaces rápidas, acessíveis e escaláveis.',
    type: 'website',
    url: 'https://example.com/',
    locale: 'pt_BR'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Persio Godoy | Desenvolvedor Full-Stack',
    description: 'Portfólio moderno com animações e performance.',
    creator: '@',
  },
  robots: {
    index: true,
    follow: true
  },
  metadataBase: new URL('https://example.com')
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover'
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  const navLinks = generateNavLinks();

  return (
    <html lang="pt-br" suppressHydrationWarning>
      <head>
        {/* Preconnect para reduzir latência de fontes e CDN de vídeo/imagens */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://opengraph.githubassets.com" />
        {/* DNS-Prefetch para possíveis chamadas GitHub API */}
        <link rel="dns-prefetch" href="https://api.github.com" />
      </head>
      <body className={geistSans.variable}>
        {/*
          Aqui está a magia! O ThemeProvider "embrulha" tudo,
          dando a todos os componentes acesso ao tema.
          O 'enableSystem' permite a opção "Sistema".
          O 'defaultTheme' define qual tema usar se o utilizador nunca escolheu um.
        */}
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
          storageKey="site-theme"
          disableTransitionOnChange
        >
          <Header navLinks={navLinks} />
          <StructuredData navLinks={navLinks} />
          <main className="container-fluid p-0" id="main-content">{children}</main>
          <Footer />
          <BootstrapClient />
        </ThemeProvider>
      </body>
    </html>
  );
}
