import fs from 'fs'
import path from 'path'
import type { Service } from './types'

export const DEV_USER_ID = 'dev-user-00000000-0000-0000-0000-000000000000'
const FILE = path.join(process.cwd(), '.dev-data.json')

function read(): Service[] {
  try {
    return JSON.parse(fs.readFileSync(FILE, 'utf8'))
  } catch {
    return []
  }
}

function write(services: Service[]) {
  fs.writeFileSync(FILE, JSON.stringify(services, null, 2))
}

export const devStorage = {
  getForMonth(from: string, to: string): Service[] {
    return read()
      .filter((s) => s.fecha >= from && s.fecha <= to)
      .sort((a, b) => b.fecha.localeCompare(a.fecha) || b.created_at.localeCompare(a.created_at))
  },

  getById(id: string): Service | undefined {
    return read().find((s) => s.id === id)
  },

  insert(data: Omit<Service, 'id' | 'user_id' | 'created_at' | 'updated_at'>): Service {
    const services = read()
    const now = new Date().toISOString()
    const service: Service = {
      ...data,
      id: crypto.randomUUID(),
      user_id: DEV_USER_ID,
      created_at: now,
      updated_at: now,
    }
    write([...services, service])
    return service
  },

  update(id: string, data: Partial<Service>): void {
    const services = read().map((s) =>
      s.id === id ? { ...s, ...data, updated_at: new Date().toISOString() } : s,
    )
    write(services)
  },

  delete(id: string): void {
    write(read().filter((s) => s.id !== id))
  },
}
