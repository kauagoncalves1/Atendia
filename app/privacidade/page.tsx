import Link from 'next/link'

export default function PrivacidadePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-10">
          <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: '#185FA5' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </div>
          <span className="font-medium text-gray-900">Atendia</span>
        </div>

        <Link href="/dashboard" className="flex items-center gap-1.5 text-sm mb-6" style={{ color: '#185FA5' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          Voltar ao painel
        </Link>

        <div className="bg-white rounded-xl p-8" style={{ border: '0.5px solid #e5e7eb' }}>
          <h1 className="text-xl font-medium text-gray-900 mb-1">Política de Privacidade</h1>
          <p className="text-sm text-gray-400 mb-8">Última atualização: junho de 2025</p>

          <div className="flex flex-col gap-6 text-sm text-gray-600 leading-relaxed">
            <section>
              <h2 className="text-sm font-medium text-gray-900 mb-2">1. Quem somos</h2>
              <p>A Atendia é uma plataforma de atendimento automatizado via WhatsApp para pequenos negócios brasileiros. Estamos comprometidos com a proteção dos seus dados pessoais em conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018).</p>
            </section>

            <section>
              <h2 className="text-sm font-medium text-gray-900 mb-2">2. Dados que coletamos</h2>
              <ul className="list-disc list-inside space-y-1">
                <li>Nome e endereço de e-mail (cadastro)</li>
                <li>Dados do negócio (nome, endereço, serviços, horários)</li>
                <li>Número de telefone WhatsApp</li>
                <li>Histórico de conversas com clientes</li>
                <li>Dados de pagamento (processados pelo Mercado Pago)</li>
                <li>Logs de acesso e uso da plataforma</li>
              </ul>
            </section>

            <section>
              <h2 className="text-sm font-medium text-gray-900 mb-2">3. Como usamos seus dados</h2>
              <ul className="list-disc list-inside space-y-1">
                <li>Fornecer e melhorar os serviços da plataforma</li>
                <li>Gerar respostas automáticas via inteligência artificial</li>
                <li>Processar pagamentos e gerenciar assinaturas</li>
                <li>Enviar comunicações sobre o serviço</li>
                <li>Cumprir obrigações legais e regulatórias</li>
              </ul>
            </section>

            <section>
              <h2 className="text-sm font-medium text-gray-900 mb-2">4. Compartilhamento de dados</h2>
              <p>Seus dados são compartilhados apenas com parceiros essenciais para o funcionamento do serviço:</p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li><strong>Supabase</strong> — armazenamento seguro do banco de dados</li>
                <li><strong>Clerk</strong> — autenticação e gerenciamento de conta</li>
                <li><strong>Mercado Pago</strong> — processamento de pagamentos</li>
                <li><strong>Google (Gemini)</strong> — geração de respostas por IA</li>
                <li><strong>Z-API</strong> — integração com WhatsApp</li>
              </ul>
              <p className="mt-2">Não vendemos seus dados a terceiros.</p>
            </section>

            <section>
              <h2 className="text-sm font-medium text-gray-900 mb-2">5. Retenção de dados</h2>
              <p>Mantemos seus dados pelo período necessário para a prestação do serviço. Histórico de conversas é retido por <strong>12 meses</strong>. Após o cancelamento da conta, seus dados são excluídos em até <strong>30 dias</strong>.</p>
            </section>

            <section>
              <h2 className="text-sm font-medium text-gray-900 mb-2">6. Seus direitos (LGPD)</h2>
              <p>Conforme a LGPD, você tem direito a:</p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>Confirmar a existência de tratamento dos seus dados</li>
                <li>Acessar seus dados</li>
                <li>Corrigir dados incompletos ou incorretos</li>
                <li>Solicitar a exclusão dos seus dados</li>
                <li>Revogar o consentimento a qualquer momento</li>
              </ul>
              <p className="mt-2">
                Para exercer seus direitos, acesse{' '}
                <Link href="/privacidade/exclusao" style={{ color: '#185FA5' }}>
                  Solicitar exclusão de dados
                </Link>{' '}
                ou entre em contato: <a href="mailto:privacidade@atendia.com.br" style={{ color: '#185FA5' }}>privacidade@atendia.com.br</a>
              </p>
            </section>

            <section>
              <h2 className="text-sm font-medium text-gray-900 mb-2">7. Segurança</h2>
              <p>Utilizamos criptografia, autenticação de dois fatores e controle de acesso por tenant para proteger seus dados. Nossos servidores estão localizados no Brasil (São Paulo).</p>
            </section>

            <section>
              <h2 className="text-sm font-medium text-gray-900 mb-2">8. Contato</h2>
              <p>Dúvidas sobre esta política? Entre em contato com nosso encarregado de dados (DPO): <a href="mailto:privacidade@atendia.com.br" style={{ color: '#185FA5' }}>privacidade@atendia.com.br</a></p>
            </section>
          </div>
        </div>

        <p className="text-xs text-gray-400 text-center mt-6">
          © 2025 Atendia · <Link href="/privacidade" style={{ color: '#185FA5' }}>Política de Privacidade</Link>
        </p>
      </div>
    </div>
  )
}