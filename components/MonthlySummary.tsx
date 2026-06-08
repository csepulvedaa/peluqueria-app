'use client'

import { useIvaMode } from '@/providers/IvaProvider'
import { computeMonthly } from '@/lib/calculations'
import { formatCLP } from '@/lib/format'
import { Card, CardContent } from '@/components/ui/card'
import type { Service } from '@/lib/types'

interface Props {
  services: Service[]
}

export function MonthlySummary({ services }: Props) {
  const { mode } = useIvaMode()
  const totals = computeMonthly(services, mode)

  return (
    <Card className="mx-4 mb-4">
      <CardContent className="pt-4 pb-4">
        <div className="text-center mb-4">
          <p className="text-sm text-muted-foreground mb-1">Mi ganancia del mes</p>
          <p className="text-4xl font-bold tabular-nums">{formatCLP(totals.miGanancia)}</p>
          <p className="text-xs text-muted-foreground mt-1">
            {mode === 'con' ? 'con IVA incluido' : 'sin IVA descontado'}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 border-t pt-3 text-sm">
          <div>
            <p className="text-muted-foreground">Total servicios</p>
            <p className="font-semibold tabular-nums">{formatCLP(totals.totalServicios)}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Total sin IVA</p>
            <p className="font-semibold tabular-nums">{formatCLP(totals.totalSinIva)}</p>
          </div>
          <div>
            <p className="text-muted-foreground">IVA (boleta)</p>
            <p className="font-semibold tabular-nums">{formatCLP(totals.totalBoleta)}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Servicios</p>
            <p className="font-semibold tabular-nums">{services.length}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
