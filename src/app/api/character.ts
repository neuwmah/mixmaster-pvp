import { User } from '@/types/user';
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

export async function getCharactersByUser(user: User): Promise<Character[] | []> {
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
