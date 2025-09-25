// Server Component: lista projetos com fetch em build/time revalidate para SEO
// Remove dependência de estado/efeitos. Fallback local caso GitHub falhe.
import Image from 'next/image';
import { buildProjectsPayload, ProjectItem as GithubProjectItem } from '@/app/lib/github';

// Reexpõe interface para manter compatibilidade (se houver import externo)
export type ProjectItem = GithubProjectItem;

const fallbackProjects: ProjectItem[] = [
  { title: 'Plataforma de E-commerce', description: 'E-commerce com carrinho, pagamentos e gestão de catálogo.', image: 'https://placehold.co/600x400/0A192F/CCD6F6?text=Projeto+1', tags: ['Next.js', 'TypeScript', 'Stripe'], link: '#' },
  { title: 'Gestão de Tarefas Real-Time', description: 'Colaboração em tempo real com autenticação e sincronização.', image: 'https://placehold.co/600x400/0A192F/CCD6F6?text=Projeto+2', tags: ['React', 'Firebase', 'Bootstrap'], link: '#' },
  { title: 'Website Institucional SEO', description: 'Site otimizado para SEO e performance.', image: 'https://placehold.co/600x400/0A192F/CCD6F6?text=Projeto+3', tags: ['HTML5', 'SCSS', 'JavaScript'], link: '#' }
];
export async function ProjectsSection() {
  const USERNAME = process.env.GITHUB_USERNAME || 'persiopg';
  const payload = await buildProjectsPayload(USERNAME, { limit: 6 });
  const hasGithub = payload.projects && payload.projects.length > 0;
  const error = payload.error && !hasGithub ? payload.error : null;
  const projects = hasGithub ? payload.projects : fallbackProjects;

  return (
    <section id="projetos" className="py-5" data-observe aria-labelledby="projetos-heading">
      <div className="section-wrapper">
        <h2 id="projetos-heading" className="section-title display-6 fw-bold mb-5 text-center gradient-text" data-anim>Projetos</h2>
        {error && (
          <p className="text-danger mb-4 text-center" data-anim role="alert">Falha ao consultar GitHub. Exibindo fallback local. ({error})</p>
        )}
        <div className="row g-4" aria-live="polite">
          {projects.map((project, i) => (
            <article key={project.title + i} className="col-md-6 col-lg-4" data-anim>
              <div className="project-card h-100 d-flex flex-column">
                <div className="ratio" style={{ aspectRatio: '3 / 2' }}>
                  <Image
                    src={project.image}
                    alt={`Projeto: ${project.title}`}
                    fill
                    priority={i === 0 && hasGithub}
                    loading={i === 0 && hasGithub ? 'eager' : 'lazy'}
                    decoding="async"
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
  );
}
