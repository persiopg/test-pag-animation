"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaReact, FaNodeJs, FaDatabase, FaAws, FaPaperPlane } from 'react-icons/fa';
import { SiTypescript, SiNextdotjs } from 'react-icons/si';
import { loadAnime } from './lib/animeLoader';

interface ProjectItem {
	title: string;
	description: string;
	image: string;
	tags: string[];
	link: string;
	stars?: number;
	forks?: number;
	updatedAt?: string;
}

const fallbackProjects: ProjectItem[] = [
	{ title: 'Plataforma de E-commerce', description: 'E-commerce com carrinho, pagamentos e gestão de catálogo.', image: 'https://placehold.co/600x400/0A192F/CCD6F6?text=Projeto+1', tags: ['Next.js', 'TypeScript', 'Stripe'], link: '#' },
	{ title: 'Gestão de Tarefas Real-Time', description: 'Colaboração em tempo real com autenticação e sincronização.', image: 'https://placehold.co/600x400/0A192F/CCD6F6?text=Projeto+2', tags: ['React', 'Firebase', 'Bootstrap'], link: '#' },
	{ title: 'Website Institucional SEO', description: 'Site otimizado para SEO e performance.', image: 'https://placehold.co/600x400/0A192F/CCD6F6?text=Projeto+3', tags: ['HTML5', 'SCSS', 'JavaScript'], link: '#' }
];

export default function HomePage() {
	const [projects, setProjects] = useState<ProjectItem[]>(fallbackProjects);
	const [loadingProjects, setLoadingProjects] = useState(true);
	const [projectsError, setProjectsError] = useState<string | null>(null);

	useEffect(() => {
		let cancelled = false;
		(async () => {
			// Carregar projetos GitHub em paralelo às animações
			fetch('/api/projects?limit=6')
				.then(async r => {
					if (!r.ok) throw new Error('Falha ao carregar projetos');
					return r.json();
				})
				.then((data: { projects: ProjectItem[]; from: string; error?: string }) => {
					if (cancelled) return;
					if (data.projects.length) setProjects(data.projects);
					if (data.error) setProjectsError(data.error);
				})
				.catch(err => { if (!cancelled) setProjectsError(err.message); })
				.finally(() => { if (!cancelled) setLoadingProjects(false); });

			const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
			const anime = prefersReduce ? null : await loadAnime();
			if (cancelled) return;
			if (!anime) {
				document.querySelectorAll('.letter, .hero-subtitle, .hero-cta, [data-anim]').forEach(el => {
					const elH = el as HTMLElement;
					elH.style.opacity = '1';
					elH.style.transform = 'none';
				});
				return;
			}
			anime({ targets: '.hero-title .letter', opacity: [0, 1], translateY: [85, 0], easing: 'easeOutExpo', duration: 1200, delay: anime.stagger(70) });
			anime({ targets: '.hero-subtitle', opacity: [0, 1], translateY: [18, 0], duration: 900, delay: 480, easing: 'easeOutCubic' });
			anime({ targets: '.hero-cta', opacity: [0, 1], translateY: [14, 0], duration: 800, delay: 720, easing: 'easeOutCubic' });
			const observer = new IntersectionObserver((entries) => {
				entries.forEach(entry => {
					if (!entry.isIntersecting) return;
					const els = entry.target.querySelectorAll('[data-anim]');
					anime({ targets: els, opacity: [0, 1], translateY: [20, 0], duration: 750, delay: anime.stagger(100) });
					observer.unobserve(entry.target);
				});
			}, { threshold: 0.12 });
			document.querySelectorAll('[data-observe]').forEach(sec => observer.observe(sec));
		})();
		return () => { cancelled = true; };
	}, []);

	const wrapLetters = (text: string) => text.split('').map((letter, i) => (
		<span key={i} className="letter" style={{ display: 'inline-block', whiteSpace: 'pre' }}>{letter}</span>
	));

	return (
		<>
			<section className="hero-section d-flex align-items-center justify-content-center text-center p-0" style={{ height: '100vh' }} aria-label="Apresentação">
				<video
					autoPlay
					loop
					muted
					playsInline
					preload="metadata"
					poster="/videos/background-poster.jpg"
					className="hero-video"
				>
					<source src="/videos/background-video.mp4" type="video/mp4" />
					O seu navegador não suporta vídeo HTML5.
				</video>
				<div className="hero-overlay" aria-hidden="true"></div>
				<div className="hero-content section-wrapper">
					<h1 className="hero-title display-3 fw-bold mb-3 gradient-text" aria-label="Persio Godoy Desenvolvedor Full-Stack">{wrapLetters('Persio Godoy')}</h1>
					<p className="hero-subtitle fs-4 text-muted mb-4" data-desc="tagline">Desenvolvedor Full-Stack | Especialista em React & Next.js</p>
					<div className="hero-cta d-flex justify-content-center gap-3 flex-wrap">
						<Link href="#projetos" className="btn btn-primary btn-lg">Ver Projetos</Link>
						<Link href="#contato" className="btn btn-outline-secondary btn-lg">Contato</Link>
					</div>
				</div>
			</section>

			<section id="sobre" className="py-5" data-observe aria-labelledby="sobre-heading">
				<div className="section-wrapper">
					<h2 id="sobre-heading" className="section-title display-5 fw-bold mb-4 gradient-text" data-anim>Sobre Mim</h2>
					<p className="lead mb-3" data-anim>
						Sou um desenvolvedor apaixonado por criar soluções tecnológicas de impacto, focando em experiência do utilizador, acessibilidade e performance.
					</p>
					<p data-anim>
						Com mais de uma década de experiência, atuo em todo o ciclo do produto: arquitetura, frontend, backend e otimização contínua.
					</p>
				</div>
			</section>

			<section id="habilidades" className="py-5 section-dark-themed" data-observe aria-labelledby="habilidades-heading">
				<div className="section-wrapper">
					<h2 id="habilidades-heading" className="section-title display-6 fw-bold mb-5 text-center" data-anim>Habilidades</h2>
					<div className="row g-4 text-center">
						{[{
							icon: <FaReact size={46} className="mb-2 text-primary" />, title: 'React', desc: 'Interfaces reativas e componentização eficiente.'
						}, {
							icon: <SiNextdotjs size={46} className="mb-2 text-primary" />, title: 'Next.js', desc: 'SSR, SSG e edge rendering focados em SEO.'
						}, {
							icon: <SiTypescript size={46} className="mb-2 text-primary" />, title: 'TypeScript', desc: 'Base segura e escalável.'
						}, {
							icon: <FaNodeJs size={46} className="mb-2 text-primary" />, title: 'Node.js', desc: 'APIs performáticas e manteníveis.'
						}, {
							icon: <FaDatabase size={46} className="mb-2 text-primary" />, title: 'Bases de Dados', desc: 'Modelagem relacional e NoSQL.'
						}, {
							icon: <FaAws size={46} className="mb-2 text-primary" />, title: 'Cloud & Deploy', desc: 'Automação e observabilidade.'
						}].map(skill => (
							<div key={skill.title} className="col-6 col-md-4" data-anim>
								<div className="skill-card p-4 h-100">
									{skill.icon}
									<h3 className="h5 mt-1 mb-2">{skill.title}</h3>
									<p className="text-muted small mb-0">{skill.desc}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			<section id="projetos" className="py-5" data-observe aria-labelledby="projetos-heading">
				<div className="section-wrapper">
					<h2 id="projetos-heading" className="section-title display-6 fw-bold mb-5 text-center gradient-text" data-anim>Projetos</h2>
					{projectsError && (
						<p className="text-danger mb-4 text-center" data-anim role="alert">Falha ao carregar projetos dinâmicos. Exibindo fallback. ({projectsError})</p>
					)}
					<div className="row g-4" aria-busy={loadingProjects} aria-live="polite">
						{loadingProjects && (
							<div className="col-12 text-center" data-anim>
								<div className="spinner-border text-info" role="status" aria-label="Carregando projetos">
									<span className="visually-hidden">Carregando...</span>
								</div>
							</div>
						)}
						{projects.map(project => (
							<article key={project.title} className="col-md-6 col-lg-4" data-anim>
								<div className="project-card h-100 d-flex flex-column">
									<div className="ratio" style={{ aspectRatio: '3 / 2' }}>
										<Image
											src={project.image}
											alt={`Projeto: ${project.title}`}
											fill
											sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
											style={{ objectFit: 'cover' }}
										/>
									</div>
									<div className="project-card-body p-3 d-flex flex-column flex-grow-1">
										<h3 className="h5 project-card-title mb-2 d-flex align-items-center gap-2">{project.title}
											{typeof project.stars === 'number' && (
												<span className="badge bg-warning-subtle text-warning-emphasis" title="Stars">★ {project.stars}</span>
											)}
										</h3>
										<p className="project-card-text small flex-grow-1">{project.description}</p>
										<div className="project-card-tags mb-2">
											{project.tags.map(tag => <span key={tag} className="badge bg-secondary me-1">{tag}</span>)}
										</div>
										<a href={project.link} target="_blank" rel="noopener noreferrer" className="btn btn-outline-info btn-sm mt-auto align-self-start" aria-label={`Ver detalhes do projeto ${project.title}`}>Ver Projeto</a>
									</div>
								</div>
							</article>
						))}
					</div>
				</div>
			</section>

			<section id="contato" className="py-5 section-dark-themed" data-observe aria-labelledby="contato-heading">
				<div className="section-wrapper">
					<h2 id="contato-heading" className="section-title display-6 fw-bold mb-4 text-center" data-anim>Contato</h2>
					<p className="text-center text-muted mb-5" data-anim>Tem um projeto em mente? Vamos conversar!</p>
					<div className="row justify-content-center">
						<div className="col-lg-6" data-anim>
							<form aria-label="Formulário de contato" onSubmit={(e) => { e.preventDefault(); }}>
								<div className="mb-3">
									<label htmlFor="name" className="form-label">Nome</label>
									<input type="text" name="name" id="name" className="form-control" required autoComplete="name" />
								</div>
								<div className="mb-3">
									<label htmlFor="email" className="form-label">Email</label>
									<input type="email" name="email" id="email" className="form-control" required autoComplete="email" />
								</div>
								<div className="mb-3">
									<label htmlFor="message" className="form-label">Mensagem</label>
									<textarea id="message" name="message" rows={5} className="form-control" required></textarea>
								</div>
								<div className="text-center">
									<button type="submit" className="btn btn-primary btn-lg">Enviar Mensagem <FaPaperPlane className="ms-2" /></button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}