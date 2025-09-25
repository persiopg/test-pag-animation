# Copilot Instructions - test-pag-animation

## Arquitetura do Projeto

Este é um portfólio dinâmico Next.js 15 com App Router, focado em animações e design responsivo. A aplicação implementa um sistema de navegação automático e temas dinâmicos.

### Estrutura Principal
- **`src/app/layout.tsx`**: Contém lógica crítica de geração automática de navegação através de filesystem scanning
- **`src/app/page.tsx`**: Homepage com hero video background e animações Anime.js carregadas dinamicamente
- **`src/app/components/`**: Componentes reutilizáveis com padrões específicos do projeto
- **`public/videos/`**: Assets de vídeo para backgrounds (usado em hero section)

## Padrões Específicos do Projeto

### Sistema de Navegação Automático
O `layout.tsx` implementa uma função `generateNavLinks()` que:
- Escaneia recursivamente o diretório `src/app/` 
- Gera automaticamente links de navegação baseados na estrutura de pastas
- Exclui diretórios como `components`, `api`, e pastas que começam com `(` ou `_`
- Detecta se uma pasta tem `page.tsx` para incluir no menu

```tsx
// Ao criar novas páginas, apenas crie a estrutura de pastas com page.tsx
// O sistema de navegação detectará automaticamente
src/app/nova-secao/page.tsx // ✅ Aparecerá no menu
src/app/components/Header.tsx // ❌ Será excluído (pasta components)
```

### Sistema de Temas
Implementa tema claro/escuro com:
- **`ThemeProvider.tsx`**: Wrapper do next-themes
- **`globals.css`**: Variáveis CSS customizadas com `[data-theme='dark']`
- **Header dinâmico**: Muda transparência baseado no scroll (`navbar-transparent` vs `navbar-scrolled`)

### Animações com Anime.js
- Carregamento dinâmico via CDN em `useEffect`
- Pattern de `isAnimeLoaded` state para controlar quando executar animações
- Intersection Observer para animações on-scroll
- Função `wrapLetters()` para animações de texto letra por letra

## Convenções de Desenvolvimento

### Estrutura de Componentes
```tsx
// Sempre use "use client" quando necessário (animações, hooks de navegação)
"use client";

// Pattern padrão para componentes com animações
const [isAnimeLoaded, setIsAnimeLoaded] = useState(false);
useEffect(() => {
  // Lógica de carregamento do Anime.js
}, []);
```

### CSS e Styling
- Bootstrap 5.3.7 + CSS customizado com variáveis CSS
- Usa `var(--foreground)`, `var(--background)` para cores temáticas
- Classes específicas: `.hero-section`, `.scroll-section`, `.fade-up`
- Background videos com `.hero-video` e `.hero-overlay`

### TypeScript Configuration
- Strict mode habilitado
- Path mapping: `@/*` → `./src/*`
- Target ES2017 para compatibilidade

## Comandos Essenciais

```bash
npm run dev --turbopack    # Desenvolvimento com Turbopack
npm run build             # Build de produção
npm run lint              # ESLint verification
```

## Padrões de Criação de Páginas

1. **Nova página simples**: Criar `src/app/nome-da-pagina/page.tsx`
2. **Página com animações**: Usar pattern de carregamento dinâmico do Anime.js
3. **Seções com scroll**: Adicionar classe `.scroll-section` e elementos `.fade-up`
4. **Assets de vídeo**: Colocar em `public/videos/` e referenciar como `/videos/nome.mp4`

## Dependencies Críticas
- **animejs**: Carregado via CDN (não npm) para compatibilidade
- **next-themes**: Gerenciamento de temas
- **react-bootstrap**: Componentes UI
- **react-icons**: Ícones (FaReact, SiNextdotjs, etc.)

## Notas de Performance
- Vídeos hero devem usar `autoPlay muted loop` 
- Anime.js carregado sob demanda
- Intersection Observer usado para animações eficientes
- Bootstrap carregado via `BootstrapClient.tsx` no lado do cliente