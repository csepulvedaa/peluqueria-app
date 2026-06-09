import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { BottomNav } from '@/components/BottomNav'
import { IvaToggle } from '@/components/IvaToggle'
import { Toaster } from 'sonner'
import { currentYYYYMM } from '@/lib/format'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  if (process.env.DEV_BYPASS_AUTH !== 'true') {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) redirect('/login')
  }

  // Computed server-side so client components never call new Date() during render
  const currentMonth = currentYYYYMM()

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 bg-background border-b px-4 py-3 flex items-center justify-between">
        <span className="font-semibold text-lg">✂️ Servicios</span>
        <IvaToggle />
      </header>
      <main className="flex-1 pb-20">{children}</main>
      <BottomNav currentMonth={currentMonth} />
      <Toaster position="top-center" richColors />
    </div>
  )
}
