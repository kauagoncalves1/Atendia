import { auth } from '@clerk/nextjs/server'
import { supabaseAdmin } from '@/lib/supabase'
import Link from 'next/link'

export default async function DashboardPage() {
  const { userId } = await auth()

  let { data: tenant } = await supabaseAdmin
    .from('tenants')
    .select('*')
    .eq('clerk_user_id', userId!)
    .single()

  if (!tenant) {
    const { data: newTenant } = await supabaseAdmin
      .from('tenants')
      .insert({ clerk_user_id: userId!, name: 'Meu Negócio' })
      .select()
      .single()
    tenant = newTenant
  }

  const { data: businessInfo } = await supabaseAdmin
    .from('business_info')
    .select('*')
    .eq('tenant_id', tenant?.id)
    .single()

  const { count: totalConversas } = await supabaseAdmin
    .from('conversations')
    .select('*', { count: 'exact', head: true })
    .eq('tenant_id', tenant?.id)

  const { count: conversasAbertas } = await supabaseAdmin
    .from('conversations')
    .select('*', { count: 'exact', head: true })
    .eq('tenant_id', tenant?.id)
    .eq('status', 'open')

  const { data: ultimasConversas } = await supabaseAdmin
    .from('conversations')
    .select('*')
    .eq('tenant_id', tenant?.id)
    .order('last_message_at', { ascending: false })
    .limit(5)

  const negocioCadastrado = !!businessInfo?.business_type
  const whatsappConectado = !!tenant?.zapi_instance_id

  const pendencias = [
    { feito: true, texto: 'Criar sua conta', href: null },
    { feito: negocioCadastrado, texto: 'Cadastrar seu negócio', href: '/dashboard/negocio' },
    { feito: whatsappConectado, texto: 'Conectar WhatsApp', href: '/dashboard/configuracoes' },
    { feito: tenant?.plan !== 'trial', texto: 'Escolher um plano', href: '/dashboard/configuracoes' },
  ]

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div>
        <h1 className="text-lg font-medium text-gray-900 mb-1">Bom dia!</h1>
        <p className="text-sm text-gray-500">Aqui está um resumo do seu atendimento</p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white rounded-xl p-4" style={{ border: '0.5px solid #e5e7eb' }}>
          <p className="text-xs text-gray-500 mb-2">Total de conversas</p>
          <p className="text-2xl font-medium text-gray-900">{totalConversas ?? 0}</p>
        </div>
        <div className="bg-white rounded-xl p-4" style={{ border: '0.5px solid #e5e7eb' }}>
          <p className="text-xs text-gray-500 mb-2">Conversas abertas</p>
          <p className="text-2xl font-medium" style={{ color: '#185FA5' }}>{conversasAbertas ?? 0}</p>
        </div>
        <div className="bg-white rounded-xl p-4" style={{ border: '0.5px solid #e5e7eb' }}>
          <p className="text-xs text-gray-500 mb-2">Mensagens este mês</p>
          <p className="text-2xl font-medium text-gray-900">{tenant?.messages_used_this_month ?? 0}</p>
        </div>
        <div className="bg-white rounded-xl p-4" style={{ border: '0.5px solid #e5e7eb' }}>
          <p className="text-xs text-gray-500 mb-2">WhatsApp</p>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-2 h-2 rounded-full" style={{ background: whatsappConectado ? '#16a34a' : '#d1d5db' }}></div>
            <p className="text-sm font-medium text-gray-900">{whatsappConectado ? 'Conectado' : 'Desconectado'}</p>
          </div>
        </div>
      </div>
    
      {/* Trial banner */}
      {tenant?.plan === 'trial' && (
        <div className="rounded-xl p-4 flex items-center justify-between" style={{ background: '#E6F1FB', border: '0.5px solid #B5D4F4' }}>
          <div>
            <p className="text-sm font-medium mb-0.5" style={{ color: '#0C447C' }}>Período de teste gratuito</p>
            <p className="text-xs" style={{ color: '#185FA5' }}>7 dias grátis · {100 - (tenant?.messages_used_this_month ?? 0)} mensagens restantes</p>
          </div>
          <Link href="/dashboard/configuracoes" className="text-xs text-white px-4 py-2 rounded-lg" style={{ background: '#185FA5' }}>
            Fazer upgrade
          </Link>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        {/* Próximos passos */}
        <div className="bg-white rounded-xl p-5" style={{ border: '0.5px solid #e5e7eb' }}>
          <p className="text-sm font-medium text-gray-900 mb-4">Configuração</p>
          <div className="flex flex-col gap-3">
            {pendencias.map((p, i) => (
              <div key={i} className="flex items-center gap-3">
                {p.feito ? (
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#185FA5' }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-full flex-shrink-0" style={{ border: '1.5px solid #d1d5db' }}></div>
                )}
                {p.href && !p.feito ? (
                  <Link href={p.href} className="text-sm hover:underline" style={{ color: '#185FA5' }}>{p.texto}</Link>
                ) : (
                  <span className={`text-sm ${p.feito ? 'text-gray-400 line-through' : 'text-gray-700'}`}>{p.texto}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Últimas conversas */}
        <div className="bg-white rounded-xl p-5" style={{ border: '0.5px solid #e5e7eb' }}>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-gray-900">Últimas conversas</p>
            <Link href="/dashboard/conversas" className="text-xs" style={{ color: '#185FA5' }}>Ver todas</Link>
          </div>
          {!ultimasConversas || ultimasConversas.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: '#E6F1FB' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#185FA5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              </div>
              <p className="text-xs text-gray-400 text-center">Nenhuma conversa ainda.<br/>Conecte seu WhatsApp para começar.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {ultimasConversas.map((c) => (
                <div key={c.id} className="flex items-center justify-between py-2" style={{ borderBottom: '0.5px solid #f3f4f6' }}>
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0" style={{ background: '#E6F1FB', color: '#185FA5' }}>
                      {(c.client_name ?? c.client_number).slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-900">{c.client_name ?? c.client_number}</p>
                      <p className="text-xs text-gray-400">{new Date(c.last_message_at).toLocaleDateString('pt-BR')}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    c.status === 'open' ? 'bg-blue-50 text-blue-700' :
                    c.status === 'pending' ? 'bg-yellow-50 text-yellow-700' :
                    'bg-gray-100 text-gray-500'
                  }`}>
                    {c.status === 'open' ? 'Aberta' : c.status === 'pending' ? 'Pendente' : 'Resolvida'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}