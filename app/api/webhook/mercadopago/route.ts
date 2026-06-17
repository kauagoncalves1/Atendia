import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { MercadoPagoConfig, Payment, PreApproval } from 'mercadopago'

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
})

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const type = body.type || body.action

    // Pagamento aprovado
    if (type === 'payment') {
      const payment = await new Payment(client).get({ id: body.data.id })

      if (payment.status === 'approved') {
        const tenantId = payment.metadata?.tenant_id
        if (!tenantId) return NextResponse.json({ ok: true })

        await supabaseAdmin
          .from('tenants')
          .update({ is_active: true })
          .eq('id', tenantId)

        await supabaseAdmin
          .from('subscriptions')
          .upsert({
            tenant_id: tenantId,
            status: 'active',
            current_period_end: new Date(
              Date.now() + 30 * 24 * 60 * 60 * 1000
            ).toISOString(),
          }, { onConflict: 'tenant_id' })
      }
    }

    // Assinatura atualizada
    if (type === 'subscription_preapproval') {
      const preApproval = await new PreApproval(client).get({ id: body.data.id })
      const tenantId = preApproval.external_reference

      if (!tenantId) return NextResponse.json({ ok: true })

      if (preApproval.status === 'authorized') {
        // Assinatura ativa
        const plan = preApproval.reason?.includes('Pro') ? 'pro' : 'basic'

        await supabaseAdmin
          .from('tenants')
          .update({ is_active: true, plan })
          .eq('id', tenantId)

        await supabaseAdmin
          .from('subscriptions')
          .upsert({
            tenant_id: tenantId,
            asaas_subscription_id: preApproval.id,
            status: 'active',
            current_period_end: new Date(
              Date.now() + 30 * 24 * 60 * 60 * 1000
            ).toISOString(),
          }, { onConflict: 'tenant_id' })

      } else if (preApproval.status === 'cancelled') {
        // Assinatura cancelada
        await supabaseAdmin
          .from('tenants')
          .update({ is_active: false })
          .eq('id', tenantId)

        await supabaseAdmin
          .from('subscriptions')
          .update({ status: 'cancelled' })
          .eq('tenant_id', tenantId)
      }
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Webhook MP error:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}