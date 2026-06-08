import { createClient } from '@/lib/supabase/server'
import { ServiceForm } from '@/components/ServiceForm'
import { updateService, deleteService } from '@/app/actions/services'
import { notFound } from 'next/navigation'
import type { Service } from '@/lib/types'

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditarServicioPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()

  const { data } = await supabase.from('services').select('*').eq('id', id).single()

  if (!data) notFound()

  const service = data as Service
  const updateWithId = updateService.bind(null, id)
  const deleteWithId = deleteService.bind(null, id, service.fecha)

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-xl font-semibold mb-6">Editar servicio</h1>
      <ServiceForm action={updateWithId} defaultValues={service} deleteAction={deleteWithId} />
    </div>
  )
}
