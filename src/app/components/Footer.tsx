export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="site-footer mt-auto py-4 border-top" aria-label="Rodapé do site">
      <div className="section-wrapper d-flex flex-column flex-md-row justify-content-between gap-3 align-items-start">
        <div>
          <strong>Persio Godoy</strong>
          <p className="mb-1 small">Desenvolvedor Full-Stack • Performance & Acessibilidade</p>
          <p className="mb-0 small">© {currentYear} Todos os direitos reservados.</p>
        </div>
        <nav aria-label="Links rápidos" className="small">
          <ul className="list-unstyled mb-0 d-grid" style={{gridTemplateColumns:'repeat(auto-fill, minmax(120px,1fr))', gap: '.25rem'}}>
            <li><a href="#sobre" className="text-decoration-none">Sobre</a></li>
            <li><a href="#habilidades" className="text-decoration-none">Habilidades</a></li>
            <li><a href="#projetos" className="text-decoration-none">Projetos</a></li>
            <li><a href="#contato" className="text-decoration-none">Contato</a></li>
          </ul>
        </nav>
        <div className="small" aria-label="Contacto">
          <p className="mb-1 fw-semibold">Contato</p>
          <p className="mb-1"><a href="mailto:contato@example.com" className="text-decoration-none">contato@example.com</a></p>
          <p className="mb-0"><a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-decoration-none">LinkedIn</a></p>
        </div>
      </div>
    </footer>
  );
}
