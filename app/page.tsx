import { redirect } from 'next/navigation'
import { currentYYYYMM } from '@/lib/format'

export default function RootPage() {
  redirect(`/mes/${currentYYYYMM()}`)
}
