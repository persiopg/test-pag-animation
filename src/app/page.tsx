"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaReact, FaNodeJs, FaDatabase, FaAws, FaPaperPlane } from 'react-icons/fa';
import { SiTypescript, SiNextdotjs } from 'react-icons/si';

declare global { interface Window { anime: any; } }

const projects = [ { title: "Plataforma de E-commerce", description: "Uma solução completa de e-commerce com carrinho de compras, pagamentos e gestão de produtos.", image: "https://placehold.co/600x400/0A192F/CCD6F6?text=Projeto+1", tags: ["Next.js", "TypeScript", "Stripe"], link: "#" }, { title: "Aplicação de Gestão de Tarefas", description: "Uma aplicação colaborativa para gestão de projetos e tarefas, com autenticação e atualizações em tempo real.", image: "https://placehold.co/600x400/0A192F/CCD6F6?text=Projeto+2", tags: ["React", "Firebase", "Bootstrap"], link: "#" }, { title: "Website Institucional", description: "Desenvolvimento de um website moderno e responsivo para uma agência de marketing digital, focado em SEO.", image: "https://placehold.co/600x400/0A192F/CCD6F6?text=Projeto+3", tags: ["HTML5", "SCSS", "JavaScript"], link: "#" }, ];

export default function HomePage() {
	const [isAnimeLoaded, setIsAnimeLoaded] = useState(false);

	useEffect(() => {
		if (window.anime) { setIsAnimeLoaded(true); return; }
		const script = document.createElement('script');
		script.src = "https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js";
		script.async = true;
		script.onload = () => setIsAnimeLoaded(true);
		document.body.appendChild(script);
		return () => { if (script.parentNode) document.body.removeChild(script); };
	}, []);

	useEffect(() => {
		if (!isAnimeLoaded) return;
		const anime = window.anime;
		if (typeof anime !== 'function') return;

		anime({ targets: '.hero-title .letter', opacity: [0, 1], translateY: [90, 0], easing: "easeOutExpo", duration: 1400, delay: anime.stagger(100) });
		anime({ targets: '.hero-subtitle', opacity: [0, 1], translateY: [20, 0], duration: 1200, easing: 'easeInOutQuad', delay: 800 });
		anime({ targets: '.hero-cta', opacity: [0, 1], translateY: [20, 0], duration: 1000, easing: 'easeOutExpo', delay: 1200 });

		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				const targetElements = entry.target.querySelectorAll('.section-title, .fade-up');
				if (entry.isIntersecting) {
					anime({ targets: targetElements, opacity: [0, 1], translateY: [20, 0], duration: 1200, delay: anime.stagger(150) });
				} else {
					anime.set(targetElements, { opacity: 0, translateY: 20 });
				}
			});
		}, { threshold: 0.15 });

		document.querySelectorAll('.scroll-section').forEach(section => observer.observe(section));
		return () => observer.disconnect();

	}, [isAnimeLoaded]);

	const wrapLetters = (text: string) => text.split('').map((letter, index) => <span key={index} className="letter" style={{display: 'inline-block', whiteSpace: 'pre'}}>{letter}</span>);

	return (
		<>
			<section className="hero-section container-fluid d-flex align-items-center justify-content-center text-center p-0" style={{ height: '100vh' }}>
        <video 
          autoPlay 
          loop 
          muted 
          className="hero-video"
        >
          {/* IMPORTANTE: Coloque o seu ficheiro de vídeo na pasta /public
            e substitua o caminho abaixo. Por exemplo: "/videos/meu-video.mp4"
          */}
          <source src="/videos/background-video.mp4" type="video/mp4" />
          O seu navegador não suporta a tag de vídeo.
        </video>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title display-3 fw-bold mb-3">{wrapLetters("Persio Godoy")}</h1>
          <p className="hero-subtitle fs-4 text-muted mb-4">Desenvolvedor Full-Stack | Especialista em React & Next.js</p> 
          <div className="hero-cta">
            <Link href="/projetos" className="btn btn-primary btn-lg me-2">Meus Projetos</Link>
            <Link href="/contato" className="btn btn-outline-secondary btn-lg">Contato</Link>
          </div>
        </div>
      </section>
			<section id="sobre" className="container-fluid  scroll-section py-5"> <div className="container"> <h2 className="section-title display-5 fw-bold mb-4">Sobre Mim</h2> <p className="lead fade-up">Sou um desenvolvedor apaixonado por criar soluções tecnológicas que resolvem problemas reais. Com mais de uma década de experiência, especializei-me no ecossistema JavaScript moderno, focando em performance, escalabilidade e na melhor experiência para o utilizador.</p> <p className="fade-up">A minha jornada na programação começou com a curiosidade de entender como as coisas funcionavam por detrás dos ecrãs. Hoje, essa curiosidade transformou-se numa carreira onde procuro constantemente aprender e aplicar as melhores práticas de arquitetura de software e design de interfaces.</p> </div> </section>
			<section id="habilidades" className="container-fluid  scroll-section py-5 section-dark-themed"> <div className="container"> <h2 className="section-title display-5 fw-bold mb-5 text-center">Habilidades</h2> <div className="row text-center g-4"><div className="col-md-4 fade-up"> <div className="skill-card"> <FaReact size={50} className="mb-3 text-primary" /> <h4>React</h4> <p>Criação de interfaces reativas e componentizadas.</p> </div> </div><div className="col-md-4 fade-up"> <div className="skill-card"> <SiNextdotjs size={50} className="mb-3 text-primary" /> <h4>Next.js</h4> <p>Aplicações SSR e SSG otimizadas para SEO e performance.</p> </div> </div><div className="col-md-4 fade-up"> <div className="skill-card"> <SiTypescript size={50} className="mb-3 text-primary" /> <h4>TypeScript</h4> <p>Código mais seguro, escalável e de fácil manutenção.</p> </div> </div><div className="col-md-4 fade-up"> <div className="skill-card"> <FaNodeJs size={50} className="mb-3 text-primary" /> <h4>Node.js</h4> <p>Desenvolvimento de APIs e serviços de backend.</p> </div> </div><div className="col-md-4 fade-up"> <div className="skill-card"> <FaDatabase size={50} className="mb-3 text-primary" /> <h4>Bases de Dados</h4> <p>Experiência com SQL (PostgreSQL) e NoSQL (MongoDB).</p> </div> </div><div className="col-md-4 fade-up"> <div className="skill-card"> <FaAws size={50} className="mb-3 text-primary" /> <h4>Cloud & Deploy</h4> <p>Implantação e gestão de aplicações em serviços como Vercel e AWS.</p> </div> </div></div> </div> </section>
			<section id="projetos" className="container-fluid  scroll-section py-5"> <div className="container"> <h2 className="section-title display-5 fw-bold mb-5 text-center">Projetos</h2> <div className="row g-4"> {projects.map((project, index) => ( <div key={index} className="col-lg-4 col-md-6 fade-up"> <div className="project-card"> <img src={project.image} alt={`Imagem do projeto ${project.title}`} className="project-card-img" /> <div className="project-card-body"> <h4 className="project-card-title">{project.title}</h4> <p className="project-card-text">{project.description}</p> <div className="project-card-tags"> {project.tags.map(tag => <span key={tag} className="badge bg-secondary me-1">{tag}</span>)} </div> <a href={project.link} className="btn btn-outline-info mt-3" target="_blank" rel="noopener noreferrer">Ver Projeto</a> </div> </div> </div> ))} </div> </div> </section>
			<section id="contato" className="container-fluid  scroll-section py-5 section-dark-themed"> <div className="container"> <h2 className="section-title display-5 fw-bold mb-4 text-center">Contato</h2> <p className="text-center text-muted mb-5 fade-up">Tem um projeto em mente? Vamos conversar!</p> <div className="row justify-content-center"> <div className="col-lg-6"> <form> <div className="mb-3 fade-up"> <label htmlFor="name" className="form-label">Nome</label> <input type="text" className="form-control" id="name" required /> </div> <div className="mb-3 fade-up"> <label htmlFor="email" className="form-label">Email</label> <input type="email" className="form-control" id="email" required /> </div> <div className="mb-3 fade-up"> <label htmlFor="message" className="form-label">Mensagem</label> <textarea className="form-control" id="message" rows={5} required></textarea> </div> <div className="text-center fade-up"> <button type="submit" className="btn btn-primary btn-lg"> Enviar Mensagem <FaPaperPlane className="ms-2" /> </button> </div> </form> </div> </div> </div> </section>
		</>
	);
}