import createApiClient from '@/hooks/axios';
import { Changelog } from '@/types/changelog';

const baseURL = `${process.env.DATABASE_URL}/changelog`;

export async function getChangelogs(): Promise<Changelog[]> {
  const api = createApiClient(baseURL);
  try {
    const response = await api.get('/');

    if (response.data)
      return response.data

    return []
  } catch (error) {
    console.error('getChangelogs error', error);
    return []
  }
}

export async function getChangelog(id: String): Promise<Changelog | null> {
  const api = createApiClient(baseURL + `/${id}`);
  try {
    const response = await api.get('/');
    
    if (response.data)
      return response.data

    return null
  } catch (error) {
    console.error('getChangelog error', error);
    return null
  }
}