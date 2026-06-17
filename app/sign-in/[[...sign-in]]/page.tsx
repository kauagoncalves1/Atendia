import { SignIn } from '@clerk/nextjs'
import Link from 'next/link'

export default function SignInPage() {
  return (
    <div className="flex min-h-screen">
      {/* Lado esquerdo */}
      <div className="hidden lg:flex flex-1 flex-col justify-between p-10" style={{ background: '#042C53' }}>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: '#378ADD' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </div>
          <span className="text-white font-medium text-base">Atendia</span>
        </div>

        <div>
          <p className="text-xs font-medium tracking-widest mb-3" style={{ color: '#85B7EB' }}>ATENDIMENTO INTELIGENTE</p>
          <h1 className="text-3xl font-medium text-white leading-snug mb-4">
            Seu negócio atendendo<br/>clientes 24 horas por dia
          </h1>
          <p className="text-sm leading-relaxed mb-10" style={{ color: '#85B7EB' }}>
            Automatize o WhatsApp do seu negócio com IA. Responda clientes, informe preços e agende serviços automaticamente.
          </p>

          {/* Ilustração */}
          <div className="rounded-xl p-6 mb-10" style={{ background: '#0C447C' }}>
            <div className="flex items-start gap-3 mb-4">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-medium" style={{ background: '#378ADD', color: '#fff' }}>C</div>
              <div className="rounded-xl rounded-tl-none px-4 py-2.5 text-sm" style={{ background: '#185FA5', color: '#fff' }}>
                Olá! Qual o valor do corte masculino?
              </div>
            </div>
            <div className="flex items-start gap-3 justify-end mb-4">
              <div className="rounded-xl rounded-tr-none px-4 py-2.5 text-sm" style={{ background: '#378ADD', color: '#fff' }}>
                Olá! O corte masculino é R$35. Quer agendar? 😊
              </div>
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-medium" style={{ background: '#042C53', color: '#85B7EB' }}>IA</div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-medium" style={{ background: '#378ADD', color: '#fff' }}>C</div>
              <div className="rounded-xl rounded-tl-none px-4 py-2.5 text-sm" style={{ background: '#185FA5', color: '#fff' }}>
                Sim! Para amanhã às 10h
              </div>
            </div>
          </div>

          {/* Planos */}
          <p className="text-xs font-medium tracking-widest mb-3" style={{ color: '#85B7EB' }}>PLANOS DISPONÍVEIS</p>
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl p-4" style={{ background: '#0C447C' }}>
              <p className="text-xs mb-1" style={{ color: '#85B7EB' }}>Trial</p>
              <p className="text-white font-medium">Grátis</p>
              <p className="text-xs mt-1" style={{ color: '#85B7EB' }}>7 dias · 100 msg</p>
            </div>
            <div className="rounded-xl p-4" style={{ background: '#0C447C' }}>
              <p className="text-xs mb-1" style={{ color: '#85B7EB' }}>Básico</p>
              <p className="text-white font-medium">R$97<span className="text-xs font-normal">/mês</span></p>
              <p className="text-xs mt-1" style={{ color: '#85B7EB' }}>500 msg/mês</p>
            </div>
            <div className="rounded-xl p-4" style={{ background: '#378ADD' }}>
              <p className="text-xs mb-1" style={{ color: '#B5D4F4' }}>Pro</p>
              <p className="text-white font-medium">R$197<span className="text-xs font-normal">/mês</span></p>
              <p className="text-xs mt-1" style={{ color: '#B5D4F4' }}>Ilimitado</p>
            </div>
          </div>
        </div>

        <p className="text-xs" style={{ color: '#85B7EB' }}>
          © 2025 Atendia ·{' '}
          <Link href="/privacidade" style={{ color: '#85B7EB' }}>Política de Privacidade</Link>
        </p>
      </div>

      {/* Lado direito — formulário */}
      <div className="flex-1 lg:max-w-md flex flex-col items-center justify-center p-8" style={{ background: '#F0F5FF' }}>
        {/* Logo mobile */}
        <div className="flex items-center gap-2 mb-8 lg:hidden">
          <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: '#378ADD' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </div>
          <span className="font-medium text-gray-900">Atendia</span>
        </div>

        <SignIn
          appearance={{
            elements: {
              rootBox: 'w-full',
              card: 'shadow-none bg-white rounded-xl border border-gray-200 w-full',
              headerTitle: 'text-base font-medium text-gray-900',
              headerSubtitle: 'text-sm text-gray-500',
              formButtonPrimary: 'text-sm font-medium',
              formFieldInput: 'text-sm rounded-lg border-gray-300',
              formFieldLabel: 'text-xs text-gray-500',
              footerActionLink: 'text-sm font-medium',
            },
            variables: {
              colorPrimary: '#185FA5',
              borderRadius: '0.5rem',
              fontFamily: 'inherit',
            },
          }}
        />

        <p className="text-xs text-center mt-6" style={{ color: '#85B7EB' }}>
          Ao continuar, você concorda com nossa{' '}
          <Link href="/privacidade" className="underline" style={{ color: '#185FA5' }}>
            Política de Privacidade
          </Link>
        </p>
      </div>
    </div>
  )
}