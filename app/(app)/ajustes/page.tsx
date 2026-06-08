import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { LogoutButton } from '@/components/LogoutButton'

export default async function AjustesPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  return (
    <div className="max-w-lg mx-auto p-4 space-y-4">
      <h1 className="text-xl font-semibold">Ajustes</h1>

      <Card>
        <CardContent className="pt-6 space-y-1">
          <p className="text-sm text-muted-foreground">Cuenta</p>
          <p className="font-medium">{user.email}</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6 space-y-3">
          <p className="text-sm text-muted-foreground">Instalar app</p>
          <p className="text-sm">
            En iPhone: toca el botón compartir{' '}
            <span className="font-mono bg-muted px-1 rounded">⬆</span> y luego{' '}
            <strong>"Agregar a pantalla de inicio"</strong>.
          </p>
          <p className="text-sm">
            En Android: toca el menú y selecciona{' '}
            <strong>"Instalar aplicación"</strong> o{' '}
            <strong>"Agregar a pantalla principal"</strong>.
          </p>
        </CardContent>
      </Card>

      <LogoutButton />
    </div>
  )
}
