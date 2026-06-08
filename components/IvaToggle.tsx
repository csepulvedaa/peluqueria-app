'use client'

import { useIvaMode } from '@/providers/IvaProvider'

export function IvaToggle() {
  const { mode, toggle } = useIvaMode()

  return (
    <button
      onClick={toggle}
      role="switch"
      aria-checked={mode === 'con'}
      className="flex items-center gap-1 bg-muted rounded-full p-1 text-sm font-medium transition-colors"
    >
      <span
        className={`px-3 py-1 rounded-full transition-all ${
          mode === 'con' ? 'bg-background shadow text-foreground' : 'text-muted-foreground'
        }`}
      >
        Con IVA
      </span>
      <span
        className={`px-3 py-1 rounded-full transition-all ${
          mode === 'sin' ? 'bg-background shadow text-foreground' : 'text-muted-foreground'
        }`}
      >
        Sin IVA
      </span>
    </button>
  )
}
