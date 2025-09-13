import createApiClient from '@/hooks/axios'
import { Pet } from '@/types/pet'

const baseEnv = process.env.NEXT_PUBLIC_BACKEND_API_URL || process.env.BACKEND_API_URL || ''

export async function createPetsBulk(
    list: {
      characterOrder?: number;
      characterId: string;
      henchId: string;
      nickname?: string;
      in_party?: boolean;
    }[]
  ): Promise<{ data?: Pet[]; error?: string }>{
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

export async function deletePetsBulk(
  characterId: string,
  petIds: string[]
): Promise<{ ok?: boolean; count?: number; error?: string }> {
  if (!baseEnv) return { error: 'API URL not configured' }
  try {
    const api = createApiClient(baseEnv)
    const { data, status } = await api.delete('/pets/bulk', { data: { characterId, petIds } })
    if (status !== 200) return { error: 'Bulk delete failed' }
    return { ok: true, count: data.count }
  } catch (e: any) {
    const msg = e?.response?.data?.message
    return { error: msg || 'Bulk delete failed' }
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
