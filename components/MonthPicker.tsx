'use client'

import Link from 'next/link'
import { prevMonth, nextMonth } from '@/lib/format'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Props {
  yyyymm: string
  label: string
  currentMonth: string
}

export function MonthPicker({ yyyymm, label, currentMonth }: Props) {
  const isCurrentMonth = yyyymm === currentMonth

  return (
    <div className="flex items-center justify-between">
      <Link
        href={`/mes/${prevMonth(yyyymm)}`}
        className="p-2 rounded-full hover:bg-muted active:scale-90 transition-transform"
        aria-label="Mes anterior"
      >
        <ChevronLeft className="w-5 h-5" />
      </Link>
      <div className="text-center">
        <p className="font-semibold capitalize">{label}</p>
        {isCurrentMonth && (
          <p className="text-xs text-muted-foreground">mes actual</p>
        )}
      </div>
      <Link
        href={`/mes/${nextMonth(yyyymm)}`}
        className="p-2 rounded-full hover:bg-muted active:scale-90 transition-transform"
        aria-label="Mes siguiente"
      >
        <ChevronRight className="w-5 h-5" />
      </Link>
    </div>
  )
}
