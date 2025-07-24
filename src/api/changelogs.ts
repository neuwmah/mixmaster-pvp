import { Changelog } from '@/types/changelog';
import createApiClient from '@/hooks/axios';

const baseURL = `${process.env.API_URL}/changelog`;

export async function getChangelogs(): Promise<Changelog[]> {
  const api = createApiClient(baseURL);
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error) {
    console.error('getMenus error', error);
    return [];
  }
}