import createApiClient from '@/hooks/axios';
import { getCharacter } from '@/app/api/character';
import { Guild } from '@/types/guild';

const baseURL = `${process.env.DATABASE_URL}/guilds`;

export async function getGuilds(): Promise<Guild[]> {
  const api = createApiClient(baseURL);
  try {
    const response = await api.get('/');

    if (response.data)
      return response.data

    return []
  } catch (error) {
    console.error('getGuilds error', error);
    return []
  }
}

export async function getGuild(id: String): Promise<Guild | null> {
  const api = createApiClient(baseURL + `/${id}`);
  try {
    const response = await api.get('/');
    
    if (response.data && response.data.master) {
      const res = response.data;
      res.master = await getCharacter(response.data.master.id);

      return res
    }

    return null
  } catch (error: any) {
    
    if (error?.response?.status === 429) {
      console.warn('getGuild: Rate limit exceeded (429)')
      return null
    }
    
    console.error('getGuild error', error)
    return null
  }
}