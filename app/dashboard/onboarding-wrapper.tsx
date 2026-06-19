'use client'

import { useState } from 'react'
import Onboarding from './onboarding'

export default function OnboardingWrapper({
  tenantId,
  mostrarInicial,
}: {
  tenantId: string
  mostrarInicial: boolean
}) {
  const [mostrar, setMostrar] = useState(mostrarInicial)

  async function finalizar() {
    setMostrar(false)
    await fetch('/api/onboarding', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tenantId }),
    })
  }

  if (!mostrar) return null

  return <Onboarding onFinish={finalizar} />
}