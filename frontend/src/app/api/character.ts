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

export async function createCharacter(character: Partial<Character>): Promise<Character | null> {
  if (!baseEnv) return null;
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
      level: character.level,
      map: character.map
    } as {
      userId?: string; name?: string; class?: string; energy?: number; agility?: number; accuracy?: number; luck?: number; level?: number; map?: string;
    }
    const { data, status } = await api.post('/characters', payload)
    if (status !== 201 || !data) return null
    return data as Character
  } catch (e) {
    console.error('createCharacter error', e)
    return null
  }
}