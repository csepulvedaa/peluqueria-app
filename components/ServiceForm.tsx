'use client'

import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { TIPOS_SERVICIO, PORCENTAJES, NOMBRES_SUGERIDOS } from '@/lib/constants'
import type { TipoServicio } from '@/lib/constants'
import type { Service } from '@/lib/types'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Trash2 } from 'lucide-react'

interface Props {
  action: (formData: FormData) => Promise<void>
  defaultValues?: Service
  deleteAction?: () => Promise<void>
}

function todayISO(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export function ServiceForm({ action, defaultValues, deleteAction }: Props) {
  const [nombre, setNombre] = useState(defaultValues?.nombre ?? '')
  const [fecha, setFecha] = useState(defaultValues?.fecha ?? todayISO())
  const [tipo, setTipo] = useState<TipoServicio>(defaultValues?.tipo ?? 'Corte')
  const [valor, setValor] = useState(defaultValues?.valor?.toString() ?? '')
  const [isPending, startTransition] = useTransition()
  const [isDeleting, startDeleting] = useTransition()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData()
    fd.set('nombre', nombre)
    fd.set('fecha', fecha)
    fd.set('tipo', tipo)
    fd.set('valor', valor.replace(/\D/g, ''))
    startTransition(async () => {
      try {
        await action(fd)
      } catch {
        toast.error('No se pudo guardar el servicio')
      }
    })
  }

  function handleValorChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/\D/g, '')
    setValor(raw)
  }

  function handleDelete() {
    if (!deleteAction) return
    startDeleting(async () => {
      try {
        await deleteAction()
      } catch {
        toast.error('No se pudo eliminar el servicio')
      }
    })
  }

  const valorNum = parseInt(valor || '0')
  const ganancia = valorNum * PORCENTAJES[tipo]

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Nombre */}
      <div className="space-y-2">
        <Label htmlFor="nombre">Nombre del servicio</Label>
        <Input
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Ej: Brushing, Tinte..."
          list="nombres-sugeridos"
          required
          className="h-12 text-base"
          autoComplete="off"
        />
        <datalist id="nombres-sugeridos">
          {NOMBRES_SUGERIDOS.map((n) => (
            <option key={n} value={n} />
          ))}
        </datalist>
      </div>

      {/* Fecha */}
      <div className="space-y-2">
        <Label htmlFor="fecha">Fecha</Label>
        <Input
          id="fecha"
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          required
          className="h-12 text-base"
        />
      </div>

      {/* Tipo de servicio */}
      <div className="space-y-2">
        <Label>Tipo de servicio</Label>
        <div className="grid grid-cols-3 gap-2">
          {TIPOS_SERVICIO.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTipo(t)}
              className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all ${
                tipo === t
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-border text-muted-foreground hover:border-primary/50'
              }`}
            >
              <span className="font-medium text-sm">{t}</span>
              <span className="text-xs mt-0.5">{Math.round(PORCENTAJES[t] * 100)}%</span>
            </button>
          ))}
        </div>
      </div>

      {/* Valor */}
      <div className="space-y-2">
        <Label htmlFor="valor">Valor cobrado ($)</Label>
        <Input
          id="valor"
          inputMode="numeric"
          pattern="[0-9]*"
          value={valor}
          onChange={handleValorChange}
          placeholder="Ej: 25000"
          required
          className="h-12 text-base"
        />
        {valorNum > 0 && (
          <p className="text-sm text-muted-foreground">
            Tu ganancia:{' '}
            <span className="font-semibold text-foreground">
              ${Math.round(ganancia).toLocaleString('es-CL')}
            </span>{' '}
            ({Math.round(PORCENTAJES[tipo] * 100)}%)
          </p>
        )}
      </div>

      {/* Submit */}
      <Button
        type="submit"
        className="w-full h-12 text-base"
        disabled={isPending || isDeleting}
      >
        {isPending ? 'Guardando...' : defaultValues ? 'Guardar cambios' : 'Agregar servicio'}
      </Button>

      {/* Delete */}
      {deleteAction && (
        <AlertDialog>
          <AlertDialogTrigger
            className="w-full h-12 rounded-md border border-destructive/30 bg-background text-destructive hover:bg-destructive/5 flex items-center justify-center gap-2 text-sm font-medium transition-colors disabled:opacity-50"
            disabled={isDeleting || isPending}
          >
            <Trash2 className="w-4 h-4" />
            {isDeleting ? 'Eliminando...' : 'Eliminar servicio'}
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Eliminar este servicio?</AlertDialogTitle>
              <AlertDialogDescription>
                Se eliminará <strong>{defaultValues?.nombre}</strong> del{' '}
                {defaultValues?.fecha}. Esta acción no se puede deshacer.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Eliminar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </form>
  )
}
