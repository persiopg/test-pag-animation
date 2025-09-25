
import { FaReact, FaNodeJs, FaDatabase, FaAws } from 'react-icons/fa';
import { SiTypescript, SiNextdotjs } from 'react-icons/si';
import { Hero } from './components/Hero';
// Import direto: componente é client ("use client" no arquivo) e será isolado no bundle sem precisar de ssr:false
import { ProjectsSection } from './components/ProjectsSection';
import { ContactForm } from './components/ContactForm';

export default function HomePage() {
	return (
		<>
			<Hero />
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

			<ProjectsSection />

			<section id="contato" className="py-5 section-dark-themed" data-observe aria-labelledby="contato-heading">
				<div className="section-wrapper">
					<h2 id="contato-heading" className="section-title display-6 fw-bold mb-4 text-center" data-anim>Contato</h2>
					<p className="text-center text-muted mb-5" data-anim>Tem um projeto em mente? Vamos conversar!</p>
					<div className="row justify-content-center">
						<div className="col-lg-6" data-anim>
							<ContactForm />
						</div>
					</div>
				</div>
			</section>
		</>
	);
}