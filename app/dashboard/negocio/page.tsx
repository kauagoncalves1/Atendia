'use client'

import { useState } from 'react'

export default function NegocioPage() {
  const [salvando, setSalvando] = useState(false)
  const [salvo, setSalvo] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSalvando(true)

    const form = e.currentTarget
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      business_type: (form.elements.namedItem('business_type') as HTMLInputElement).value,
      city: (form.elements.namedItem('city') as HTMLInputElement).value,
      state: (form.elements.namedItem('state') as HTMLInputElement).value,
      address: (form.elements.namedItem('address') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
      welcome_message: (form.elements.namedItem('welcome_message') as HTMLTextAreaElement).value,
      rules: (form.elements.namedItem('rules') as HTMLTextAreaElement).value,
    }

    await fetch('/api/negocio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    setSalvando(false)
    setSalvo(true)
    setTimeout(() => setSalvo(false), 3000)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Meu Negócio</h1>
      <p className="text-gray-500 mb-8">Configure as informações do seu negócio</p>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        <div className="bg-white rounded-xl p-6 border border-gray-200 space-y-4">
          <h2 className="font-semibold text-gray-700">Informações básicas</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome do negócio</label>
            <input name="name" type="text" required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Ex: Barbearia do Léo" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de negócio</label>
            <input name="business_type" type="text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Ex: Barbearia, Restaurante, Salão..." />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cidade</label>
              <input name="city" type="text"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Ex: São Paulo" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
              <input name="state" type="text"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Ex: SP" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Endereço</label>
            <input name="address" type="text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Ex: Rua das Flores, 123" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
            <input name="phone" type="text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Ex: (11) 99999-9999" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 space-y-4">
          <h2 className="font-semibold text-gray-700">Atendimento</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mensagem de boas-vindas</label>
            <textarea name="welcome_message" rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Ex: Olá! Bem-vindo à Barbearia do Léo. Como posso te ajudar?" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Regras do negócio</label>
            <textarea name="rules" rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Ex: Não aceitamos cancelamentos com menos de 2h. Aceitamos apenas Pix e dinheiro." />
          </div>
        </div>

        <button type="submit" disabled={salvando}
          className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition disabled:opacity-50">
          {salvando ? 'Salvando...' : salvo ? '✅ Salvo!' : 'Salvar informações'}
        </button>
      </form>
    </div>
  )
}