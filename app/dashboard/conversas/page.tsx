import { auth } from '@clerk/nextjs/server'
import { supabaseAdmin } from '@/lib/supabase'

export default async function ConversasPage() {
  const { userId } = await auth()

  const { data: tenant } = await supabaseAdmin
    .from('tenants')
    .select('id')
    .eq('clerk_user_id', userId!)
    .single()

  const { data: conversas } = await supabaseAdmin
    .from('conversations')
    .select('*')
    .eq('tenant_id', tenant?.id)
    .order('last_message_at', { ascending: false })

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-lg font-medium text-gray-900 mb-1">Conversas</h1>
        <p className="text-sm text-gray-500">Histórico de atendimentos via WhatsApp</p>
      </div>

      {!conversas || conversas.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center" style={{ border: '0.5px solid #e5e7eb' }}>
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ background: '#E6F1FB' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#185FA5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          </div>
          <p className="text-sm font-medium text-gray-900 mb-1">Nenhuma conversa ainda</p>
          <p className="text-xs text-gray-400">Quando seus clientes enviarem mensagens, elas aparecerão aqui.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {conversas.map((conversa) => (
            <div key={conversa.id} className="bg-white rounded-xl px-4 py-3 flex items-center justify-between" style={{ border: '0.5px solid #e5e7eb' }}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-medium" style={{ background: '#E6F1FB', color: '#185FA5' }}>
                  {(conversa.client_name ?? conversa.client_number).slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{conversa.client_name ?? conversa.client_number}</p>
                  <p className="text-xs text-gray-400">{conversa.client_number}</p>
                </div>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                conversa.status === 'open'
                  ? 'bg-blue-50 text-blue-700'
                  : conversa.status === 'pending'
                  ? 'bg-yellow-50 text-yellow-700'
                  : 'bg-gray-100 text-gray-500'
              }`}>
                {conversa.status === 'open' ? 'Aberta' : conversa.status === 'pending' ? 'Pendente' : 'Resolvida'}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}