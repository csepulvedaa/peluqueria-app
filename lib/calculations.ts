import { IVA_RATE, PORCENTAJES } from './constants'
import type { Service, MonthlyTotals, ServiceCalculated, IvaMode } from './types'

export function computeService(s: Service, mode: IvaMode): ServiceCalculated {
  const valorBase = mode === 'con' ? s.valor : s.valor / IVA_RATE
  const ganancia = valorBase * PORCENTAJES[s.tipo]
  return { valorBase, ganancia }
}

export function computeMonthly(services: Service[], mode: IvaMode): MonthlyTotals {
  const totalServicios = services.reduce((a, s) => a + s.valor, 0)
  const totalSinIva = services.reduce((a, s) => a + s.valor / IVA_RATE, 0)
  const totalBoleta = totalServicios - totalSinIva
  const gananciaConIva = services.reduce((a, s) => a + s.valor * PORCENTAJES[s.tipo], 0)
  const gananciaSinIva = services.reduce(
    (a, s) => a + (s.valor / IVA_RATE) * PORCENTAJES[s.tipo],
    0,
  )
  return {
    totalServicios,
    totalSinIva,
    totalBoleta,
    gananciaConIva,
    gananciaSinIva,
    miGanancia: mode === 'con' ? gananciaConIva : gananciaSinIva,
  }
}
