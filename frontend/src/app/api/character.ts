import createApiClient from '@/hooks/axios';
import { Character } from '@/types/character';
import { User } from '@/types/user';

const baseEnv = process.env.NEXT_PUBLIC_BACKEND_API_URL || process.env.BACKEND_API_URL || ''

export async function getCharacters(): Promise<Character[]> {
  if (!baseEnv) return [];
  const api = createApiClient(baseEnv);
  try {
    const { data, status } = await api.get('/characters');
    if (status !== 200 || !Array.isArray(data)) return [];
    return data as Character[];
  } catch {
    return [];
  }
}

export async function getCharacter(id: string): Promise<Character | null> {
  if (!baseEnv) return null;
  const api = createApiClient(baseEnv);
  try {
    const { data, status } = await api.get(`/characters/${id}`);
    if (status !== 200 || !data) return null;
    return data as Character;
  } catch {
    return null;
  }
}

export async function getCharactersByUser(user: Partial<User>): Promise<Character[]> {
  try {
    const characters = await getCharacters();
    return characters.filter(c => c.user?.id === user.id);
  } catch {
    return [];
  }
}

export async function createCharacter(character: Partial<Character>): Promise<{ data?: Character; error?: string }> {
  if (!baseEnv) return { error: 'API URL not configured' };
  const api = createApiClient(baseEnv);
  try {
    const payload = {
      userId: character.userId,
      name: character.name,
      class: character.class,
      energy: character.energy,
      agility: character.agility,
      accuracy: character.accuracy,
      luck: character.luck,
    };
    const { data, status } = await api.post('/characters', payload);
    if (status !== 201 || !data) return { error: 'Create failed' };
    return { data: data as Character };
  } catch (e: any) {
    const msg = e?.response?.data?.message;
    if (e?.response?.status === 409) {
      return { error: msg || 'Character name already in use.' };
    }
    if (e?.response?.status === 400) {
      return { error: msg || 'Invalid data.' };
    }
    return { error: 'Unexpected error.' };
  }
}

export async function deleteCharacter(id: string): Promise<{ ok?: boolean; error?: string }> {
  if (!baseEnv) return { error: 'API URL not configured' };
  const api = createApiClient(baseEnv);
  try {
    const { status } = await api.delete(`/characters/${id}`);
    if (status === 204) {
      return { ok: true };
    }
    return { error: 'Delete failed' };
  } catch (e: any) {
    const msg = e?.response?.data?.message;
    return { error: msg || 'Delete failed' };
  }
}

export async function updateCharacter(id: string, data: Partial<Character>): Promise<{ data?: Character; error?: string }> {
  if (!baseEnv) return { error: 'API URL not configured' }
  const api = createApiClient(baseEnv)
  try {
    const payload: Record<string, any> = {}
    ;['name','class','energy','agility','accuracy','luck','map','userId'].forEach(k => {
      if (k in data && (data as any)[k] !== undefined) payload[k] = (data as any)[k]
    })
    if (!Object.keys(payload).length) return { error: 'No changes' }
    const { data: resp, status } = await api.put(`/characters/${id}`, payload)
    if (status !== 200) return { error: 'Update failed' }
    return { data: resp as Character }
  } catch (e: any) {
    const st = e?.response?.status
    const msg = e?.response?.data?.message
    if (st === 409) return { error: msg || 'Character name already in use.' }
    if (st === 400) return { error: msg || 'Invalid data.' }
    if (st === 404) return { error: 'Character not found.' }
    return { error: 'Unexpected error.' }
  }
}

export async function initTransfer(id: string, targetUserId: string): Promise<{ data?: Character; error?: string }> {
  if (!baseEnv) return { error: 'API URL not configured' }
  try {
    const api = createApiClient(baseEnv)
    const { data, status } = await api.post(`/characters/${id}/transfer/init`, { targetUserId })
    if (status !== 200) return { error: 'Init failed' }
    return { data: data as Character }
  } catch (e: any) {
    const msg = e?.response?.data?.message
    return { error: msg || 'Init failed' }
  }
}

export async function cancelTransfer(id: string): Promise<{ data?: Character; error?: string }> {
  if (!baseEnv) return { error: 'API URL not configured' }
  try {
    const api = createApiClient(baseEnv)
    const { data, status } = await api.post(`/characters/${id}/transfer/cancel`)
    if (status !== 200) return { error: 'Cancel failed' }
    return { data: data as Character }
  } catch (e: any) {
    const msg = e?.response?.data?.message
    return { error: msg || 'Cancel failed' }
  }
}

export async function acceptTransfer(id: string): Promise<{ data?: Character; error?: string }> {
  if (!baseEnv) return { error: 'API URL not configured' }
  try {
    const api = createApiClient(baseEnv)
    const { data, status } = await api.post(`/characters/${id}/transfer/accept`)
    if (status !== 200) return { error: 'Accept failed' }
    return { data: data as Character }
  } catch (e: any) {
    const msg = e?.response?.data?.message
    return { error: msg || 'Accept failed' }
  }
}

export async function rejectTransfer(id: string): Promise<{ data?: Character; error?: string }> {
  if (!baseEnv) return { error: 'API URL not configured' }
  try {
    const api = createApiClient(baseEnv)
    const { data, status } = await api.post(`/characters/${id}/transfer/reject`)
    if (status !== 200) return { error: 'Reject failed' }
    return { data: data as Character }
  } catch (e: any) {
    const msg = e?.response?.data?.message
    return { error: msg || 'Reject failed' }
  }
}

export async function getPendingTransfers(targetUserId: string): Promise<Character[]> {
  if (!baseEnv) return []
  try {
    const api = createApiClient(baseEnv)
    const { data, status } = await api.get(`/characters/pending/${targetUserId}`)
    if (status !== 200 || !Array.isArray(data)) return []
    return data as Character[]
  } catch { return [] }
}