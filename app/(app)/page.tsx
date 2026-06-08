import { redirect } from 'next/navigation'
import { currentYYYYMM } from '@/lib/format'

export default function HomePage() {
  redirect(`/mes/${currentYYYYMM()}`)
}
