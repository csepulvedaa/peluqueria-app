export const IVA_RATE = 1.19

export const TIPOS_SERVICIO = ['Corte', 'Color', 'Tratamiento'] as const
export type TipoServicio = (typeof TIPOS_SERVICIO)[number]

export const PORCENTAJES: Record<TipoServicio, number> = {
  Corte: 0.5,
  Color: 0.45,
  Tratamiento: 0.45,
}

export const NOMBRES_SUGERIDOS = [
  'Brushing',
  'Corte',
  'Color',
  'Tinte',
  'Mechas',
  'Botox',
  'Peinado',
  'Lavado',
  'Tratamiento',
  'Keratina',
  'Permanente',
]
