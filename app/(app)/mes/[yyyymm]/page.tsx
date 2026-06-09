import { createClient } from '@/lib/supabase/server'
import { devStorage } from '@/lib/dev-storage'
import { monthRange, formatMonthLabel, currentYYYYMM } from '@/lib/format'
import { MonthlySummary } from '@/components/MonthlySummary'
import { ServiceList } from '@/components/ServiceList'
import { MonthPicker } from '@/components/MonthPicker'
import type { Service } from '@/lib/types'

const DEV = process.env.DEV_BYPASS_AUTH === 'true'

interface Props {
  params: Promise<{ yyyymm: string }>
}

export default async function MesPage({ params }: Props) {
  const { yyyymm } = await params
  const { from, to } = monthRange(yyyymm)

  let services: Service[]
  if (DEV) {
    services = devStorage.getForMonth(from, to)
  } else {
    const supabase = await createClient()
    const { data } = await supabase
      .from('services')
      .select('*')
      .gte('fecha', from)
      .lte('fecha', to)
      .order('fecha', { ascending: false })
      .order('created_at', { ascending: false })
    services = (data ?? []) as Service[]
  }
  const label = formatMonthLabel(yyyymm)
  const currentMonth = currentYYYYMM()

  return (
    <div className="max-w-lg mx-auto">
      <div className="px-4 pt-4 pb-2">
        <MonthPicker yyyymm={yyyymm} label={label} currentMonth={currentMonth} />
      </div>
      <MonthlySummary services={services} />
      <ServiceList services={services} />
    </div>
  )
}
