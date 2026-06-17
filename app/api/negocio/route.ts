import { auth } from '@clerk/nextjs/server'
import { supabaseAdmin } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { userId } = await auth()

  if (!userId) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const body = await request.json()

  // Busca o tenant
  const { data: tenant } = await supabaseAdmin
    .from('tenants')
    .select('id')
    .eq('clerk_user_id', userId)
    .single()

  if (!tenant) {
    return NextResponse.json({ error: 'Tenant não encontrado' }, { status: 404 })
  }

  // Atualiza o nome do tenant
  await supabaseAdmin
    .from('tenants')
    .update({ name: body.name })
    .eq('id', tenant.id)

  // Upsert das informações do negócio
  const { error } = await supabaseAdmin
    .from('business_info')
    .upsert({
      tenant_id: tenant.id,
      business_type: body.business_type,
      city: body.city,
      state: body.state,
      address: body.address,
      phone: body.phone,
      welcome_message: body.welcome_message,
      rules: body.rules,
    }, { onConflict: 'tenant_id' })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}