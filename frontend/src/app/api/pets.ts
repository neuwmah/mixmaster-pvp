import createApiClient from '@/hooks/axios'
import { Pet } from '@/types/pet'

const baseEnv = process.env.NEXT_PUBLIC_BACKEND_API_URL || process.env.BACKEND_API_URL || ''

export async function createPet(data: { characterId: string; henchId: string; nickname?: string; in_party?: boolean; slot?: number | null }): Promise<{ data?: Pet; error?: string }> {
  if (!baseEnv) return { error: 'API URL not configured' }
  try {
    const api = createApiClient(baseEnv)
    const { data: resp, status } = await api.post('/pets', data)
    if (status !== 201) return { error: 'Create pet failed' }
    return { data: resp as Pet }
  } catch (e: any) {
    const msg = e?.response?.data?.message
    return { error: msg || 'Create pet failed' }
  }
}

export async function createPetsBulk(list: { characterId: string; henchId: string; nickname?: string; in_party?: boolean; slot?: number | null }[]): Promise<{ data?: Pet[]; error?: string }> {
  if (!baseEnv) return { error: 'API URL not configured' }
  try {
    const api = createApiClient(baseEnv)
    const { data, status } = await api.post('/pets/bulk', list)
    if (status !== 201 || !Array.isArray(data)) return { error: 'Bulk create failed' }
    return { data: data as Pet[] }
  } catch (e: any) {
    const msg = e?.response?.data?.message
    return { error: msg || 'Bulk create failed' }
  }
}

export async function updatePet(id: string, payload: Partial<Pick<Pet, 'nickname' | 'in_party' | 'slot' | 'level' | 'exp'>>): Promise<{ data?: Pet; error?: string }> {
  if (!baseEnv) return { error: 'API URL not configured' }
  try {
    const api = createApiClient(baseEnv)
    const { data, status } = await api.put(`/pets/${id}`, payload)
    if (status !== 200) return { error: 'Update pet failed' }
    return { data: data as Pet }
  } catch (e: any) {
    const msg = e?.response?.data?.message
    return { error: msg || 'Update pet failed' }
  }
}

export async function deletePet(id: string): Promise<{ ok?: boolean; error?: string }> {
  if (!baseEnv) return { error: 'API URL not configured' }
  try {
    const api = createApiClient(baseEnv)
    const { status } = await api.delete(`/pets/${id}`)
    if (status !== 204) return { error: 'Delete pet failed' }
    return { ok: true }
  } catch (e: any) {
    const msg = e?.response?.data?.message
    return { error: msg || 'Delete pet failed' }
  }
}
