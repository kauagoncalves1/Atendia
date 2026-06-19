'use client'

import { useState } from 'react'

const passos = [
  {
    titulo: 'Bem-vindo ao Atendia! 👋',
    texto: 'Seu assistente de atendimento via WhatsApp está quase pronto. Vamos te mostrar como configurar tudo em poucos passos.',
    icone: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#185FA5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
  },
  {
    titulo: 'Cadastre seu negócio',
    texto: 'Vá em "Meu negócio" e preencha as informações: nome, horários, serviços e regras. É isso que a IA vai usar para responder seus clientes.',
    icone: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#185FA5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><rect x="9" y="14" width="6" height="8"/>
      </svg>
    ),
  },
  {
    titulo: 'Conecte seu WhatsApp',
    texto: 'Em "Configurações", conecte o número de WhatsApp do seu negócio. A partir daí, todas as mensagens dos seus clientes serão respondidas automaticamente.',
    icone: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#185FA5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.44 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.06 6.06l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
  },
  {
    titulo: 'Acompanhe tudo no painel',
    texto: 'Todas as conversas com seus clientes aparecem em "Conversas". Você pode acompanhar, marcar como resolvida e adicionar notas internas.',
    icone: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#185FA5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
]

export default function Onboarding({ onFinish }: { onFinish: () => void }) {
  const [passoAtual, setPassoAtual] = useState(0)
  const ultimoPasso = passoAtual === passos.length - 1

  function proximo() {
    if (ultimoPasso) {
      onFinish()
    } else {
      setPassoAtual(passoAtual + 1)
    }
  }

  const passo = passos[passoAtual]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(4, 44, 83, 0.7)' }}>
      <div className="bg-white rounded-2xl p-8 max-w-md w-full">
        {/* Ícone */}
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6" style={{ background: '#E6F1FB' }}>
          {passo.icone}
        </div>

        {/* Conteúdo */}
        <h2 className="text-lg font-medium text-gray-900 mb-2">{passo.titulo}</h2>
        <p className="text-sm text-gray-500 leading-relaxed mb-8">{passo.texto}</p>

        {/* Indicadores */}
        <div className="flex items-center gap-1.5 mb-6">
          {passos.map((_, i) => (
            <div
              key={i}
              className="h-1.5 rounded-full transition-all"
              style={{
                width: i === passoAtual ? '24px' : '8px',
                background: i <= passoAtual ? '#185FA5' : '#e5e7eb',
              }}
            />
          ))}
        </div>

        {/* Botões */}
        <div className="flex items-center justify-between">
          <button
            onClick={onFinish}
            className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            Pular tutorial
          </button>
          <button
            onClick={proximo}
            className="text-sm text-white px-5 py-2.5 rounded-lg transition-opacity hover:opacity-90"
            style={{ background: '#185FA5' }}
          >
            {ultimoPasso ? 'Começar a usar' : 'Próximo'}
          </button>
        </div>
      </div>
    </div>
  )
}