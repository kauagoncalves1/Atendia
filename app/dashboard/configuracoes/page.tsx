'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function ConfiguracoesPage() {
  const router = useRouter()

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-lg font-medium text-gray-900 mb-1">Configurações</h1>
        <p className="text-sm text-gray-500">Configure sua conta e integração com WhatsApp</p>
      </div>

      <div className="flex flex-col gap-4 max-w-2xl">
        {/* WhatsApp */}
        <div className="bg-white rounded-xl p-5" style={{ border: '0.5px solid #e5e7eb' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: '#E6F1FB' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#185FA5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.44 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.06 6.06l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">WhatsApp</p>
              <p className="text-xs text-gray-400">Conecte seu número para receber mensagens</p>
            </div>
          </div>
          <button
            className="text-sm text-white px-4 py-2 rounded-lg opacity-50 cursor-not-allowed"
            style={{ background: '#185FA5' }}
            title="Configure suas credenciais Z-API primeiro"
          >
            Conectar WhatsApp
          </button>
          <p className="text-xs text-gray-400 mt-2">Para conectar, adicione suas credenciais Z-API nas variáveis de ambiente.</p>
        </div>

        {/* Plano */}
        <div className="bg-white rounded-xl p-5" style={{ border: '0.5px solid #e5e7eb' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: '#E6F1FB' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#185FA5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Plano e pagamento</p>
              <p className="text-xs text-gray-400">Gerencie sua assinatura</p>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg mb-3" style={{ background: '#F8FAFC', border: '0.5px solid #e5e7eb' }}>
            <div>
              <p className="text-sm font-medium text-gray-900">Plano Trial</p>
              <p className="text-xs text-gray-400">7 dias grátis · 100 mensagens</p>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ background: '#E6F1FB', color: '#185FA5' }}>Ativo</span>
          </div>
          <div className="flex gap-2">
            <button
              className="text-sm text-white px-4 py-2 rounded-lg opacity-50 cursor-not-allowed"
              style={{ background: '#185FA5' }}
              title="Em breve"
            >
              Plano Básico — R$97/mês
            </button>
            <button
              className="text-sm text-white px-4 py-2 rounded-lg opacity-50 cursor-not-allowed"
              style={{ background: '#042C53' }}
              title="Em breve"
            >
              Plano Pro — R$197/mês
            </button>
          </div>
        </div>

        {/* Conta */}
        <div className="bg-white rounded-xl p-5" style={{ border: '0.5px solid #e5e7eb' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: '#E6F1FB' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#185FA5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Conta</p>
              <p className="text-xs text-gray-400">Segurança e preferências</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Link
              href="/dashboard/conta"
              className="text-sm px-4 py-2 rounded-lg transition-colors hover:bg-gray-50"
              style={{ border: '0.5px solid #e5e7eb', color: '#374151', textDecoration: 'none' }}
            >
              Alterar senha
            </Link>
            <Link
              href="/privacidade/exclusao"
              className="text-sm px-4 py-2 rounded-lg"
              style={{ border: '0.5px solid #e5e7eb', color: '#374151', textDecoration: 'none' }}
            >
              Solicitar exclusão de dados
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}