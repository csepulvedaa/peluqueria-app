'use server'

import { createClient } from '@/lib/supabase/server'
import { devStorage } from '@/lib/dev-storage'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const DEV = process.env.DEV_BYPASS_AUTH === 'true'

const ServiceSchema = z.object({
  nombre: z.string().min(1).max(100),
  fecha: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  tipo: z.enum(['Corte', 'Color', 'Tratamiento'] as const),
  valor: z.coerce.number().int().min(0),
})

type ActionResult = { redirectTo: string } | { error: string }

function yyyymmFromDate(fecha: string): string {
  return fecha.slice(0, 7).replace('-', '')
}

export async function createService(formData: FormData): Promise<ActionResult> {
  const parsed = ServiceSchema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) return { error: 'Datos inválidos' }

  if (DEV) {
    devStorage.insert(parsed.data)
  } else {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'No autenticado' }
    const { error } = await supabase.from('services').insert({ ...parsed.data, user_id: user.id })
    if (error) return { error: error.message }
  }

  const yyyymm = yyyymmFromDate(parsed.data.fecha)
  revalidatePath(`/mes/${yyyymm}`)
  return { redirectTo: `/mes/${yyyymm}` }
}

export async function updateService(id: string, formData: FormData): Promise<ActionResult> {
  const parsed = ServiceSchema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) return { error: 'Datos inválidos' }

  if (DEV) {
    devStorage.update(id, parsed.data)
  } else {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'No autenticado' }
    const { error } = await supabase
      .from('services').update(parsed.data).eq('id', id).eq('user_id', user.id)
    if (error) return { error: error.message }
  }

  const yyyymm = yyyymmFromDate(parsed.data.fecha)
  revalidatePath(`/mes/${yyyymm}`)
  return { redirectTo: `/mes/${yyyymm}` }
}

export async function deleteService(id: string, fecha: string): Promise<ActionResult> {
  if (DEV) {
    devStorage.delete(id)
  } else {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'No autenticado' }
    const { error } = await supabase
      .from('services').delete().eq('id', id).eq('user_id', user.id)
    if (error) return { error: error.message }
  }

  const yyyymm = yyyymmFromDate(fecha)
  revalidatePath(`/mes/${yyyymm}`)
  return { redirectTo: `/mes/${yyyymm}` }
}
