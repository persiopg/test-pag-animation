"use client";
import { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    // Simulação de envio. Em produção, integrar API / serviço (Resend/Formspree/etc.)
    setTimeout(() => {
      try {
        setStatus('sent');
        (e.target as HTMLFormElement).reset();
      } catch {
        setStatus('error');
      }
    }, 600);
  }

  return (
    <form aria-label="Formulário de contato" onSubmit={handleSubmit} noValidate>
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
        <textarea id="message" name="message" rows={5} className="form-control" required />
      </div>
      <div className="text-center d-flex flex-column gap-2">
        <button type="submit" className="btn btn-primary btn-lg" disabled={status === 'sending'}>
          {status === 'sending' ? 'Enviando...' : 'Enviar Mensagem'} <FaPaperPlane className="ms-2" />
        </button>
        <div aria-live="polite" className="small" role="status">
          {status === 'sent' && <span className="text-success">Mensagem enviada com sucesso!</span>}
          {status === 'error' && <span className="text-danger">Falha ao enviar. Tente novamente.</span>}
        </div>
      </div>
    </form>
  );
}
