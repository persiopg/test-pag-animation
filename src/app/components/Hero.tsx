"use client";
import { useEffect } from 'react';
import Link from 'next/link';
import { loadAnime } from '../lib/animeLoader';

function wrapLetters(text: string) {
  return text.split('').map((l, i) => (
    <span key={i} className="letter" style={{ display: 'inline-block', whiteSpace: 'pre' }}>{l}</span>
  ));
}

/**
 * Hero com responsabilidade exclusiva de animação de texto.
 * Vídeo é carregado com preload mínimo e poster removido se inexistente.
 * Usa decoding async e fetchPriority para otimizar LCP textual.
 */
export const Hero = () => {
  useEffect(() => {
    let cancel = false;
    (async () => {
      const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduce) return;
      const anime = await loadAnime();
      if (cancel || !anime) return;
      anime({ targets: '.hero-title .letter', opacity: [0, 1], translateY: [60, 0], easing: 'easeOutExpo', duration: 900, delay: anime.stagger(55) });
      anime({ targets: '.hero-subtitle', opacity: [0, 1], translateY: [14, 0], duration: 700, delay: 420, easing: 'easeOutCubic' });
      anime({ targets: '.hero-cta', opacity: [0, 1], translateY: [10, 0], duration: 650, delay: 620, easing: 'easeOutCubic' });
    })();
    return () => { cancel = true; };
  }, []);

  return (
    <section className="hero-section d-flex align-items-center justify-content-center text-center p-0" style={{ height: '100vh' }} aria-label="Apresentação">
      {/* Vídeo: despriorizar download inicial para não competir com LCP. Usa playsInline + muted para autoplay sem bloqueio */}
      <video
        className="hero-video"
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        poster="/videos/background-poster.jpg"
        aria-hidden="true"
      >
        <source src="/videos/background-video.mp4" type="video/mp4" />
      </video>
      <div className="hero-overlay" aria-hidden="true" />
      <div className="hero-content section-wrapper">
        <h1 className="hero-title display-3 fw-bold mb-3 gradient-text" aria-label="Persio Godoy Desenvolvedor Full-Stack" style={{ contain: 'content' }}>
          {wrapLetters('Persio Godoy')}
        </h1>
        <p className="hero-subtitle fs-4 text-muted mb-4" data-desc="tagline">Desenvolvedor Full-Stack | Especialista em React & Next.js</p>
        <div className="hero-cta d-flex justify-content-center gap-3 flex-wrap">
          <Link href="#projetos" className="btn btn-primary btn-lg">Ver Projetos</Link>
          <Link href="#contato" className="btn btn-outline-secondary btn-lg">Contato</Link>
        </div>
      </div>
    </section>
  );
};
