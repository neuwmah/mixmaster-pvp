import createApiClient from '@/hooks/axios';
import { Character } from '@/types/character';
import { User } from '@/types/user';

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

export async function getCharacter(id: string): Promise<Character | null> {
  const api = createApiClient(baseURL + `/${id}`);
  try {
    const response = await api.get('/');
    
    if (response.data)
      return response.data

    return null
  } catch (error: any) {
    
    if (error?.response?.status === 429) {
      console.warn('getCharacter: Rate limit exceeded (429)')
      return null
    }
    
    console.error('getCharacter error', error)
    return null
  }
}

export async function getCharactersByUser(user: Partial<User>): Promise<Character[] | []> {
  try {
    const characters = await getCharacters();
    const userCharacters = characters.filter(
      (c) => c.user && c.user.id === user.id
    );

    return userCharacters
  } catch (error) {
    console.error('getCharactersByUser error', error);
    return []
  }
}