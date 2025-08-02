import { RankPVP } from '@/types/rankpvp';
import createApiClient from '@/hooks/axios';

const baseURL = `${process.env.DATABASE_URL}/rankpvp`;

// get top 5
export async function getRankPVP(): Promise<RankPVP[]> {
  const api = createApiClient(baseURL);
  try {
    const response = await api.get('/');

    if (response.data)
      return response.data

    return []
  } catch (error) {
    console.error('getRankPVP error', error);
    return []
  }
}