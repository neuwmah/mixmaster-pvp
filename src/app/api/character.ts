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

export async function getCharacterById(id: string): Promise<Character | null> {
  try {
    const characters = await getCharacters();
    const character = characters.filter(
      (c) => c.id && c.id === id
    )[0];

    return character
  } catch (error) {
    console.error('getCharacterById error', error);
    return null
  }
}