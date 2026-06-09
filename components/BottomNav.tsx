'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CalendarDays, Plus, Settings } from 'lucide-react'

interface Props {
  currentMonth: string
}

export function BottomNav({ currentMonth }: Props) {
  const pathname = usePathname()

  const navItems = [
    {
      href: `/mes/${currentMonth}`,
      label: 'Mes',
      icon: CalendarDays,
      active: pathname.startsWith('/mes'),
    },
    {
      href: '/servicio/nuevo',
      label: 'Agregar',
      icon: Plus,
      active: pathname === '/servicio/nuevo',
      primary: true,
    },
    {
      href: '/ajustes',
      label: 'Ajustes',
      icon: Settings,
      active: pathname === '/ajustes',
    },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {navItems.map(({ href, label, icon: Icon, active, primary }) => (
          <Link
            key={label}
            href={href}
            className={`flex flex-col items-center gap-1 py-3 px-6 min-w-[4rem] transition-colors ${
              primary
                ? 'text-primary'
                : active
                  ? 'text-foreground'
                  : 'text-muted-foreground'
            }`}
          >
            <Icon className={`w-6 h-6 ${primary ? 'stroke-[2.5]' : ''}`} />
            <span className="text-xs font-medium">{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}
