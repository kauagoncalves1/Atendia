import { auth } from '@clerk/nextjs/server'
import { supabaseAdmin } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { userId } = await auth()

  if (!userId) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const { tenantId } = await request.json()

  await supabaseAdmin
    .from('tenants')
    .update({ onboarding_completo: true })
    .eq('id', tenantId)
    .eq('clerk_user_id', userId)

  return NextResponse.json({ success: true })
}