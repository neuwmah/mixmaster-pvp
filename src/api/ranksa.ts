import { RankSA } from '@/types/ranksa';
import createApiClient from '@/hooks/axios';

const baseURL = `${process.env.API_URL_2}/ranksa`;

// get top 3
export async function getRankSA(): Promise<RankSA[]> {
  const api = createApiClient(baseURL);
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error) {
    console.error('getMenus error', error);
    return [];
  }
}