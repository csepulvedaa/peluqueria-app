import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { currentYYYYMM } from '@/lib/format'
import { devStorage } from '@/lib/dev-storage'

// Always dynamic — queries DB for most recent service month
export const dynamic = 'force-dynamic'

const DEV = process.env.DEV_BYPASS_AUTH === 'true'

export default async function RootPage() {
  const current = currentYYYYMM()

  if (DEV) {
    // In dev, find most recent month from local storage
    const all = devStorage.getForMonth('2000-01-01', '2099-12-31')
    if (all.length > 0) {
      const latest = all[0].fecha.slice(0, 7).replace('-', '')
      redirect(`/mes/${latest <= current ? latest : current}`)
    }
    redirect(`/mes/${current}`)
  }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data } = await supabase
    .from('services')
    .select('fecha')
    .order('fecha', { ascending: false })
    .limit(1)
    .single()

  if (data?.fecha) {
    const latest = (data.fecha as string).slice(0, 7).replace('-', '')
    redirect(`/mes/${latest <= current ? latest : current}`)
  }

  redirect(`/mes/${current}`)
}
