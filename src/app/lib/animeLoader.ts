// Tipagem mínima para as funções principais usadas do anime.js
export interface AnimeInstance {
  finished: Promise<void>;
  pause: () => void;
  play: () => void;
}
export interface AnimeStatic {
  (params: Record<string, unknown>): AnimeInstance | void;
  stagger: (val: number | string) => (el: HTMLElement, i: number) => number;
  set: (targets: unknown, params: Record<string, unknown>) => void;
}

export async function loadAnime(): Promise<AnimeStatic | null> {
  if (typeof window === 'undefined') return null;
  const win = window as unknown as { anime?: unknown };
  if (typeof win.anime === 'function') return win.anime as unknown as AnimeStatic;
  await new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js';
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Falha ao carregar Anime.js'));
    document.head.appendChild(script);
  });
  return (typeof win.anime === 'function' ? (win.anime as unknown as AnimeStatic) : null);
}
