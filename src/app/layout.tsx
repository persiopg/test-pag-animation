import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

import { Header } from "./components/Header";
import BootstrapClient from "./components/BootstrapClient";
import { ThemeProvider } from "./components/ThemeProvider"; // Importa o nosso novo provider

import fs from 'fs';
import path from 'path';

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
export const metadata: Metadata = { title: "Portfólio Dinâmico", description: "Portfólio com Next.js, Bootstrap e Animações" };
// --- Função RECURSIVA para gerar os links (MODIFICADA) ---
function generateNavLinks(directory: string, basePath: string = ''): any[] {
  const excludedDirs = ['components', 'api'];
  let links = [];

  try {
    const items = fs.readdirSync(directory, { withFileTypes: true });

    for (const item of items) {
      if (!item.isDirectory() || excludedDirs.includes(item.name) || item.name.startsWith('(') || item.name.startsWith('_')) {
        continue;
      }

      const fullPath = path.join(directory, item.name);
      const href = `${basePath}/${item.name}`;
      const label = item.name.charAt(0).toUpperCase() + item.name.slice(1);
      
      const hasPage = fs.existsSync(path.join(fullPath, 'page.tsx')) || fs.existsSync(path.join(fullPath, 'page.jsx'));
      const subLinks = generateNavLinks(fullPath, href);

      // Inclui a pasta no menu se ela for uma página OU se tiver sub-links
      if (hasPage || subLinks.length > 0) {
        links.push({ href, label, hasPage, subLinks });
      }
    }
  } catch (error) {
    // Ignora erros de diretórios que não podem ser lidos
  }
  
  return links;
}

function getFinalLinks() {
  const projectRoot = process.cwd();
  const appDirPath = fs.existsSync(path.join(projectRoot, 'src', 'app')) 
    ? path.join(projectRoot, 'src', 'app') 
    : path.join(projectRoot, 'app');
  
  const generatedLinks = generateNavLinks(appDirPath);
  
  // Adiciona o link "Home" manualmente
  return [{ href: '/', label: 'Home', hasPage: true, subLinks: [] }, ...generatedLinks];
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  const navLinks = getFinalLinks();

  return (
    <html lang="pt-br" suppressHydrationWarning>
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
        >
          <Header navLinks={navLinks} />
          <main className="container-fluid p-0">
            {children}
          </main>
          <BootstrapClient />
        </ThemeProvider>
      </body>
    </html>
  );
}
