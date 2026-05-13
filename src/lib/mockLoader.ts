import type { DashboardResponse } from '../types/api'

export async function loadMock(filename: string): Promise<DashboardResponse> {
  await new Promise(resolve => setTimeout(resolve, 800))
  const res = await fetch(`/mocks/${filename}`)
  if (!res.ok) {
    throw new Error(`Failed to load mock: ${res.status} ${res.statusText}`)
  }
  return res.json() as Promise<DashboardResponse>
}
