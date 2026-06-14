const clpFormatter = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0,
})

export function formatCLP(value: number): string {
  return clpFormatter.format(Math.round(value))
}

export function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split('-').map(Number)
  // Use noon to avoid UTC→local offset wrapping to previous/next day
  return new Intl.DateTimeFormat('es-CL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'America/Santiago',
  }).format(new Date(year, month - 1, day, 12, 0, 0))
}

export function formatMonthLabel(yyyymm: string): string {
  const year = parseInt(yyyymm.slice(0, 4))
  const month = parseInt(yyyymm.slice(4, 6)) - 1
  // Use noon (12:00) to avoid UTC→Santiago offset wrapping midnight to previous day
  // e.g. June 1 00:00 UTC = May 31 20:00 Santiago → would show "Mayo"
  return new Intl.DateTimeFormat('es-CL', {
    month: 'long',
    year: 'numeric',
    timeZone: 'America/Santiago',
  }).format(new Date(year, month, 1, 12, 0, 0))
}

export function currentYYYYMM(): string {
  const now = new Date()
  const y = now.getFullYear()
  const m = String(now.getMonth() + 1).padStart(2, '0')
  return `${y}${m}`
}

export function prevMonth(yyyymm: string): string {
  const year = parseInt(yyyymm.slice(0, 4))
  const month = parseInt(yyyymm.slice(4, 6))
  const d = new Date(year, month - 2, 1)
  return `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}`
}

export function nextMonth(yyyymm: string): string {
  const year = parseInt(yyyymm.slice(0, 4))
  const month = parseInt(yyyymm.slice(4, 6))
  const d = new Date(year, month, 1)
  return `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}`
}

export function monthRange(yyyymm: string): { from: string; to: string } {
  const year = parseInt(yyyymm.slice(0, 4))
  const month = parseInt(yyyymm.slice(4, 6))
  const from = `${year}-${String(month).padStart(2, '0')}-01`
  const lastDay = new Date(year, month, 0).getDate()
  const to = `${year}-${String(month).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`
  return { from, to }
}
