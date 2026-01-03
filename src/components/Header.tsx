interface HeaderProps {
  title: string
}

export function Header({ title }: HeaderProps) {
  return (
    <header className='bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4'>
      <h1 className='text-xl sm:text-2xl font-bold text-gray-900'>{title}</h1>
    </header>
  )
}
