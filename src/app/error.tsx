'use client';

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="container py-5">
      <h2>Ocorreu um erro inesperado.</h2>
      <p className="text-muted">Tente novamente ou volte mais tarde.</p>
      <button className="btn btn-primary" onClick={() => reset()}>Tentar novamente</button>
    </div>
  );
}
