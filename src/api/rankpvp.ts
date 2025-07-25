import { RankPVP } from '@/types/rankpvp';
import createApiClient from '@/hooks/axios';

const baseURL = `${process.env.API_URL_2}/rankpvp`;

// get top 5
export async function getRankPVP(): Promise<RankPVP[]> {
  const api = createApiClient(baseURL);
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error) {
    console.error('getMenus error', error);
    return [];
  }
}