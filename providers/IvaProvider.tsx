'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import type { IvaMode } from '@/lib/types'

interface IvaContextType {
  mode: IvaMode
  toggle: () => void
}

const IvaContext = createContext<IvaContextType>({
  mode: 'con',
  toggle: () => {},
})

export function IvaProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<IvaMode>('con')

  useEffect(() => {
    const stored = localStorage.getItem('iva-mode') as IvaMode | null
    if (stored === 'con' || stored === 'sin') setMode(stored)
  }, [])

  function toggle() {
    setMode((prev) => {
      const next: IvaMode = prev === 'con' ? 'sin' : 'con'
      localStorage.setItem('iva-mode', next)
      return next
    })
  }

  return <IvaContext.Provider value={{ mode, toggle }}>{children}</IvaContext.Provider>
}

export function useIvaMode() {
  return useContext(IvaContext)
}
