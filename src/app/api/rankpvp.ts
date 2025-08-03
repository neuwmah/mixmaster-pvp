import createApiClient from '@/hooks/axios';
import { getCharacterById } from '@/app/api/character';
import { RankPVP } from '@/types/rankpvp';

const baseURL = `${process.env.DATABASE_URL}/rankpvp`;

export async function getRankPVP(): Promise<RankPVP[]> {
  const api = createApiClient(baseURL);
  try {
    const response = await api.get('/');

    if (response.data) {
      const result = await Promise.all(
        response.data.map(async (rank: RankPVP) => ({
          ...rank,
          player: await getCharacterById(rank.player.id)
        }))
      );

      return result;
    }

    return []
  } catch (error) {
    console.error('getRankPVP error', error);
    return []
  }
}