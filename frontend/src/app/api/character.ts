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

export async function deleteCharacter(id: string): Promise<boolean> {
  if (!baseEnv) return false;
  const api = createApiClient(baseEnv);
  try {
    const { status } = await api.delete(`/characters/${id}`);
    return status === 204;
  } catch {
    return false;
  }
}