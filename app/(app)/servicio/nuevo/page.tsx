import { ServiceForm } from '@/components/ServiceForm'
import { createService } from '@/app/actions/services'

export default function NuevoServicioPage() {
  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-xl font-semibold mb-6">Nuevo servicio</h1>
      <ServiceForm action={createService} />
    </div>
  )
}
