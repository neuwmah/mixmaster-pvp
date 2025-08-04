import createApiClient from '@/hooks/axios';
import { getGuild } from '@/app/api/guild';
import { getCharacter } from '@/app/api/character';
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
          guild: await getGuild(rank.guild.id),
          master: await getCharacter(rank.master.id)
        }))
      );
      
      let data: RankSA[] = result;
      data.sort((a, b) => b.guild && b.guild.castles_count - a.guild.castles_count);

      return data;
    }

    return []
  } catch (error) {
    console.error('getRankSA error', error);
    return []
  }
}