import { Character } from '@/types/character';
import createApiClient from '@/hooks/axios';

const baseURL = `${process.env.DATABASE_URL}/characters`;

export async function getCharacters(): Promise<Character[]> {
  const api = createApiClient(baseURL);
  try {
    const response = await api.get('/');

    if (response.data)
      return response.data

    return []
  } catch (error) {
    console.error('getCharacters error', error);
    return []
  }
}

export async function getCharacter(id: String): Promise<Character | null> {
  const api = createApiClient(baseURL + `/${id}`);
  try {
    const response = await api.get('/');
    
    if (response.data)
      return response.data

    return null
  } catch (error) {
    console.error('getCharacter error', error);
    return null
  }
}
