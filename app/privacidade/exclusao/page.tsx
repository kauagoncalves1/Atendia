'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ExclusaoDadosPage() {
  const [enviado, setEnviado] = useState(false)
  const [enviando, setEnviando] = useState(false)
  const [motivo, setMotivo] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setEnviando(true)
    await new Promise(r => setTimeout(r, 1500))
    setEnviando(false)
    setEnviado(true)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8">
          <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: '#185FA5' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </div>
          <span className="font-medium text-gray-900">Atendia</span>
        </div>

        {enviado ? (
          <div className="bg-white rounded-xl p-8 text-center" style={{ border: '0.5px solid #e5e7eb' }}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: '#E6F1FB' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#185FA5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <h2 className="text-base font-medium text-gray-900 mb-2">Solicitação recebida</h2>
            <p className="text-sm text-gray-500 mb-6">
              Recebemos sua solicitação de exclusão de dados. Processaremos em até <strong>15 dias úteis</strong> conforme a LGPD.
            </p>
            <Link href="/dashboard" className="text-sm" style={{ color: '#185FA5' }}>
              Voltar ao painel
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-xl p-8" style={{ border: '0.5px solid #e5e7eb' }}>
            <h1 className="text-base font-medium text-gray-900 mb-1">Solicitar exclusão de dados</h1>
            <p className="text-sm text-gray-500 mb-6">
              Conforme a <strong>Lei Geral de Proteção de Dados (LGPD)</strong>, você tem o direito de solicitar a exclusão dos seus dados pessoais da plataforma Atendia.
            </p>

            <div className="rounded-lg p-4 mb-6" style={{ background: '#FEF9EC', border: '0.5px solid #FDE68A' }}>
              <p className="text-xs font-medium text-yellow-800 mb-1">⚠️ Atenção antes de continuar</p>
              <ul className="text-xs text-yellow-700 space-y-1 list-disc list-inside">
                <li>Sua conta será permanentemente desativada</li>
                <li>Todos os dados do negócio serão removidos</li>
                <li>O histórico de conversas será apagado</li>
                <li>Essa ação não pode ser desfeita</li>
              </ul>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Motivo da solicitação (opcional)</label>
                <textarea
                  value={motivo}
                  onChange={e => setMotivo(e.target.value)}
                  rows={3}
                  className="w-full rounded-lg px-3 py-2 text-sm text-gray-900 outline-none"
                  style={{ border: '0.5px solid #e5e7eb' }}
                  placeholder="Conte-nos o motivo para podermos melhorar o serviço..."
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Link
                  href="/dashboard/configuracoes"
                  className="flex-1 text-sm px-4 py-2.5 rounded-lg text-center transition-colors hover:bg-gray-50"
                  style={{ border: '0.5px solid #e5e7eb', color: '#374151', textDecoration: 'none' }}
                >
                  Cancelar
                </Link>
                <button
                  type="submit"
                  disabled={enviando}
                  className="flex-1 text-sm text-white px-4 py-2.5 rounded-lg disabled:opacity-50"
                  style={{ background: '#dc2626' }}
                >
                  {enviando ? 'Enviando...' : 'Confirmar exclusão'}
                </button>
              </div>
            </form>

            <p className="text-xs text-gray-400 text-center mt-6">
              Dúvidas? Entre em contato: <a href="mailto:privacidade@atendia.com.br" style={{ color: '#185FA5' }}>privacidade@atendia.com.br</a>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}