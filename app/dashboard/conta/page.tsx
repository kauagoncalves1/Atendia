import { UserProfile } from '@clerk/nextjs'

export default function ContaPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-lg font-medium text-gray-900 mb-1">Minha conta</h1>
        <p className="text-sm text-gray-500">Gerencie suas informações, senha e segurança</p>
      </div>
      <UserProfile
        appearance={{
          elements: {
            rootBox: 'w-full',
            card: 'shadow-none border border-gray-200 rounded-xl w-full',
            navbar: 'border-r border-gray-200',
            navbarButton: 'text-sm text-gray-700',
            navbarButtonIcon: 'text-gray-500',
            headerTitle: 'text-base font-medium text-gray-900',
            headerSubtitle: 'text-sm text-gray-500',
            formButtonPrimary: 'bg-blue-600 hover:bg-blue-700 text-sm',
            formFieldInput: 'border border-gray-300 rounded-lg text-sm',
            formFieldLabel: 'text-xs text-gray-500',
          },
          variables: {
            colorPrimary: '#185FA5',
            borderRadius: '0.5rem',
            fontFamily: 'inherit',
          },
        }}
      />
    </div>
  )
}