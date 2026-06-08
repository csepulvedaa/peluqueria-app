import type { TipoServicio } from './constants'

export type { TipoServicio }

export type IvaMode = 'con' | 'sin'

export interface Service {
  id: string
  user_id: string
  nombre: string
  fecha: string // ISO date string YYYY-MM-DD
  tipo: TipoServicio
  valor: number // CLP integer
  created_at: string
  updated_at: string
}

export interface MonthlyTotals {
  totalServicios: number
  totalSinIva: number
  totalBoleta: number
  gananciaConIva: number
  gananciaSinIva: number
  miGanancia: number
}

export interface ServiceCalculated {
  valorBase: number
  ganancia: number
}
