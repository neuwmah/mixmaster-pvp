import createApiClient from '@/hooks/axios';
import { getGuild } from '@/app/api/guild';
import { getCharacter } from '@/app/api/character';
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
          guild: await getGuild(rank.guild.id),
          player: await getCharacter(rank.player.id)
        }))
      );

      let data: RankPVP[] = result;
      data.sort((a, b) => b.player && a.player && b.player.kills_count - a.player.kills_count);

      return data
    }

    return []
  } catch (error: any) {
    
    if (error?.response?.status === 429) {
      console.warn('getRankPVP: Rate limit exceeded (429)')
      return []
    }
    
    console.error('getRankPVP error', error)
    return []
  }
}