import createApiClient from '@/hooks/axios';
import { getCharacterById } from '@/app/api/character';
import { RankSA } from '@/types/ranksa';

const baseURL = `${process.env.DATABASE_URL}/ranksa`;

export async function getRankSA(): Promise<RankSA[]> {
  const api = createApiClient(baseURL);
  try {
    const response = await api.get('/');

    if (response.data) {
      const result = await Promise.all(
        response.data.map(async (rank: RankSA) => ({
          ...rank,
          master: await getCharacterById(rank.master.id)
        }))
      );

      return result;
    }

    return []
  } catch (error) {
    console.error('getRankSA error', error);
    return []
  }
}