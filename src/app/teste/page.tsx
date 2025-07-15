// Exemplo de caminho: /app/servicos/page.tsx

// Opcional: Adicionar metadados específicos para esta página
// import type { Metadata } from 'next';

// export const metadata: Metadata = {
//   title: 'Nome da Página - Meu Site',
//   description: 'Descrição específica para esta página.',
// };

export default function NovaPagina() {
  return (
    <section>
      {/* O container e o espaçamento já são fornecidos pelo layout.tsx */}
      <h1 className="mb-4">Título da Nova Página</h1>
      <p>
        Este é o conteúdo da sua nova página. Você pode adicionar qualquer
        componente React ou elemento HTML aqui.
      </p>
    </section>
  );
}