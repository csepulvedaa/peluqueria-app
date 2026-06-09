import { createClient } from '@/lib/supabase/server'
import { devStorage } from '@/lib/dev-storage'
import { ServiceForm } from '@/components/ServiceForm'
import { updateService, deleteService } from '@/app/actions/services'
import { notFound } from 'next/navigation'
import type { Service } from '@/lib/types'

const DEV = process.env.DEV_BYPASS_AUTH === 'true'

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditarServicioPage({ params }: Props) {
  const { id } = await params

  let data: Service | null | undefined
  if (DEV) {
    data = devStorage.getById(id)
  } else {
    const supabase = await createClient()
    const { data: row } = await supabase.from('services').select('*').eq('id', id).single()
    data = row as Service | null
  }

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
