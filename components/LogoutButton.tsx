'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'

export function LogoutButton() {
  const router = useRouter()

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <Button
      variant="destructive"
      className="w-full h-12"
      onClick={handleLogout}
    >
      <LogOut className="w-4 h-4 mr-2" />
      Cerrar sesión
    </Button>
  )
}
