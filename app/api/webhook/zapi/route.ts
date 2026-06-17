import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Ignora mensagens enviadas pelo próprio bot
    if (body.fromMe) return NextResponse.json({ ok: true })

    // Extrai dados da mensagem
    const clientNumber = body.phone?.replace(/\D/g, '')
    const messageText = body.text?.message || body.caption || ''
    const instanceId = body.instanceId

    if (!clientNumber || !messageText) {
      return NextResponse.json({ ok: true })
    }

    // Busca o tenant pelo instanceId do Z-API
    const { data: tenant } = await supabaseAdmin
      .from('tenants')
      .select('*')
      .eq('zapi_instance_id', instanceId)
      .single()

    if (!tenant || !tenant.is_active) {
      return NextResponse.json({ ok: true })
    }

    // Verifica limite de mensagens
    if (tenant.plan === 'basic' && tenant.messages_used_this_month >= 500) {
      return NextResponse.json({ ok: true })
    }

    // Busca dados do negócio
    const { data: businessInfo } = await supabaseAdmin
      .from('business_info')
      .select('*')
      .eq('tenant_id', tenant.id)
      .single()

    const { data: services } = await supabaseAdmin
      .from('services')
      .select('*')
      .eq('tenant_id', tenant.id)
      .eq('is_active', true)

    // Busca ou cria conversa
    let { data: conversation } = await supabaseAdmin
      .from('conversations')
      .select('*')
      .eq('tenant_id', tenant.id)
      .eq('client_number', clientNumber)
      .single()

    if (!conversation) {
      const { data: newConversation } = await supabaseAdmin
        .from('conversations')
        .insert({
          tenant_id: tenant.id,
          client_number: clientNumber,
          status: 'open',
        })
        .select()
        .single()
      conversation = newConversation
    }

    // Busca últimas 5 mensagens
    const { data: recentMessages } = await supabaseAdmin
      .from('messages')
      .select('*')
      .eq('conversation_id', conversation.id)
      .order('created_at', { ascending: false })
      .limit(5)

    const historico = recentMessages
      ?.reverse()
      .map((m) => `${m.sender === 'client' ? 'Cliente' : 'Atendia'}: ${m.content}`)
      .join('\n') ?? ''

    // Monta lista de serviços
    const servicosList = services
      ?.map((s) => `- ${s.name}${s.price ? ` (R$${s.price})` : ''}${s.description ? `: ${s.description}` : ''}`)
      .join('\n') ?? 'Nenhum serviço cadastrado'

    // Salva mensagem do cliente
    await supabaseAdmin.from('messages').insert({
      conversation_id: conversation.id,
      sender: 'client',
      content: messageText,
    })

    // Monta prompt
    const prompt = `Você é o Atendia, assistente de atendimento de ${tenant.name}, um ${businessInfo?.business_type ?? 'negócio'} localizado em ${businessInfo?.city ?? ''}/${businessInfo?.state ?? ''}.

Dados do negócio:
- Endereço: ${businessInfo?.address ?? 'Não informado'}
- Telefone: ${businessInfo?.phone ?? 'Não informado'}
- Serviços:
${servicosList}
- Regras: ${businessInfo?.rules ?? 'Nenhuma regra cadastrada'}
- Mensagem de boas-vindas: ${businessInfo?.welcome_message ?? 'Olá! Como posso ajudar?'}

Histórico recente:
${historico || 'Primeira mensagem do cliente'}

Mensagem atual do cliente: "${messageText}"

Instruções:
- Seja simpático, profissional e direto.
- Responda em português do Brasil, natural e sem erros.
- Se o cliente perguntar algo fora do escopo, diga educadamente que você só atende dúvidas sobre o negócio.
- Se não souber responder, diga: "Vou pedir para o responsável responder em breve."
- Nunca invente informações. Se não tiver o dado, diga que não tem essa informação disponível.
- Respostas curtas e objetivas. Máximo 3 parágrafos.`

    // Chama Gemini
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
    const result = await model.generateContent(prompt)
    const botReply = result.response.text()

    // Salva resposta do bot
    await supabaseAdmin.from('messages').insert({
      conversation_id: conversation.id,
      sender: 'bot',
      content: botReply,
    })

    // Atualiza última mensagem e contador
    await supabaseAdmin
      .from('conversations')
      .update({ last_message_at: new Date().toISOString() })
      .eq('id', conversation.id)

    await supabaseAdmin
      .from('tenants')
      .update({ messages_used_this_month: (tenant.messages_used_this_month ?? 0) + 1 })
      .eq('id', tenant.id)

    // Envia resposta via Z-API
    await fetch(
      `https://api.z-api.io/instances/${tenant.zapi_instance_id}/token/${tenant.zapi_token}/send-text`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Client-Token': process.env.ZAPI_SECRET!,
        },
        body: JSON.stringify({
          phone: clientNumber,
          message: botReply,
        }),
      }
    )

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}