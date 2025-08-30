import createApiClient from '@/hooks/axios';
import { getGuild } from '@/app/api/guild';
import { getCharacter } from '@/app/api/character';
import { RankPVP } from '@/types/rankpvp';

const baseEnv = process.env.BACKEND_API_URL;

export async function getRankPVP(): Promise<RankPVP[]> {
  if (!baseEnv) return [];
  const api = createApiClient(baseEnv);
  try {
    const { data, status } = await api.get('/rankpvp');
    if (status !== 200 || !Array.isArray(data)) return [];
    const result = await Promise.all(
      data.map(async (row: any) => {
        const player = await getCharacter(row.id); // row.id é o character id
        const guild = row.guild?.id ? await getGuild(row.guild.id) : null;
        return { id: row.id, player, guild } as RankPVP;
      })
    );
    result.sort((a, b) => (b.player?.kills_count ?? 0) - (a.player?.kills_count ?? 0));
    return result;
  } catch {
    return [];
  }
}