'use client'

import Link from 'next/link'
import { useIvaMode } from '@/providers/IvaProvider'
import { computeService } from '@/lib/calculations'
import { formatCLP, formatDate } from '@/lib/format'
import { Badge } from '@/components/ui/badge'
import type { Service } from '@/lib/types'

const tipoBadgeClass: Record<string, string> = {
  Corte: 'bg-orange-100 text-orange-800 border-orange-200',
  Color: 'bg-purple-100 text-purple-800 border-purple-200',
  Tratamiento: 'bg-green-100 text-green-800 border-green-200',
}

interface Props {
  services: Service[]
}

export function ServiceList({ services }: Props) {
  const { mode } = useIvaMode()

  if (services.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div className="text-5xl mb-3">📋</div>
        <p className="font-medium text-lg mb-1">Sin servicios este mes</p>
        <p className="text-sm text-muted-foreground">Toca el botón + para agregar uno</p>
      </div>
    )
  }

  return (
    <div className="px-4 space-y-2">
      {services.map((service) => {
        const { ganancia } = computeService(service, mode)
        return (
          <Link
            key={service.id}
            href={`/servicio/${service.id}`}
            className="flex items-center justify-between p-4 bg-card border rounded-xl active:scale-[0.98] transition-transform"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium truncate">{service.nombre}</span>
                <Badge variant="outline" className={`text-xs shrink-0 ${tipoBadgeClass[service.tipo]}`}>
                  {service.tipo}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{formatDate(service.fecha)}</p>
            </div>
            <div className="text-right ml-3 shrink-0">
              <p className="font-semibold tabular-nums">{formatCLP(ganancia)}</p>
              <p className="text-xs text-muted-foreground tabular-nums">{formatCLP(service.valor)}</p>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
