import { RankSA } from '@/types/ranksa';
import createApiClient from '@/hooks/axios';

const baseURL = `${process.env.DATABASE_URL}/ranksa`;

// get top 3
export async function getRankSA(): Promise<RankSA[]> {
  const api = createApiClient(baseURL);
  try {
    const response = await api.get('/');

    if (response.data)
      return response.data

    return []
  } catch (error) {
    console.error('getRankSA error', error);
    return []
  }
}