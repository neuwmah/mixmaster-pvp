import createApiClient from '@/hooks/axios';
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
    
    if (response.data)
      return response.data

    return null
  } catch (error) {
    console.error('getGuild error', error);
    return null
  }
}