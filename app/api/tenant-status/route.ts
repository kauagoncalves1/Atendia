import { auth } from '@clerk/nextjs/server'
import { supabaseAdmin } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function GET() {
  const { userId } = await auth()

  if (!userId) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  let { data: tenant } = await supabaseAdmin
    .from('tenants')
    .select('id, onboarding_completo')
    .eq('clerk_user_id', userId)
    .single()

  if (!tenant) {
    const { data: newTenant } = await supabaseAdmin
      .from('tenants')
      .insert({ clerk_user_id: userId, name: 'Meu Negócio' })
      .select('id, onboarding_completo')
      .single()
    tenant = newTenant
  }

  return NextResponse.json({
    tenantId: tenant?.id,
    onboardingCompleto: tenant?.onboarding_completo ?? false,
  })
}