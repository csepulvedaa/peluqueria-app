'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const ServiceSchema = z.object({
  nombre: z.string().min(1, 'El nombre es requerido').max(100),
  fecha: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Fecha inválida'),
  tipo: z.enum(['Corte', 'Color', 'Tratamiento'] as const),
  valor: z.coerce.number().int().min(0, 'El valor debe ser mayor a 0'),
})

function yyyymmFromDate(fecha: string): string {
  return fecha.replace(/-/g, '').slice(0, 6)
}

export async function createService(formData: FormData) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error('No autenticado')

  const parsed = ServiceSchema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) throw new Error('Datos inválidos')

  const { error } = await supabase
    .from('services')
    .insert({ ...parsed.data, user_id: user.id })

  if (error) throw new Error(error.message)

  const yyyymm = yyyymmFromDate(parsed.data.fecha)
  revalidatePath(`/mes/${yyyymm}`)
  redirect(`/mes/${yyyymm}`)
}

export async function updateService(id: string, formData: FormData) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error('No autenticado')

  const parsed = ServiceSchema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) throw new Error('Datos inválidos')

  const { error } = await supabase
    .from('services')
    .update(parsed.data)
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) throw new Error(error.message)

  const yyyymm = yyyymmFromDate(parsed.data.fecha)
  revalidatePath(`/mes/${yyyymm}`)
  redirect(`/mes/${yyyymm}`)
}

export async function deleteService(id: string, fecha: string) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error('No autenticado')

  const { error } = await supabase
    .from('services')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) throw new Error(error.message)

  const yyyymm = yyyymmFromDate(fecha)
  revalidatePath(`/mes/${yyyymm}`)
  redirect(`/mes/${yyyymm}`)
}
