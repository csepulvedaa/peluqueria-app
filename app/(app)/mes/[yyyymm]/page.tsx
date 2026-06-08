import { createClient } from '@/lib/supabase/server'
import { monthRange, formatMonthLabel } from '@/lib/format'
import { MonthlySummary } from '@/components/MonthlySummary'
import { ServiceList } from '@/components/ServiceList'
import { MonthPicker } from '@/components/MonthPicker'
import type { Service } from '@/lib/types'

interface Props {
  params: Promise<{ yyyymm: string }>
}

export default async function MesPage({ params }: Props) {
  const { yyyymm } = await params
  const { from, to } = monthRange(yyyymm)

  const supabase = await createClient()
  const { data } = await supabase
    .from('services')
    .select('*')
    .gte('fecha', from)
    .lte('fecha', to)
    .order('fecha', { ascending: false })
    .order('created_at', { ascending: false })

  const services: Service[] = (data ?? []) as Service[]
  const label = formatMonthLabel(yyyymm)

  return (
    <div className="max-w-lg mx-auto">
      <div className="px-4 pt-4 pb-2">
        <MonthPicker yyyymm={yyyymm} label={label} />
      </div>
      <MonthlySummary services={services} />
      <ServiceList services={services} />
    </div>
  )
}
