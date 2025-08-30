import createApiClient from '@/hooks/axios';
import { getGuild } from '@/app/api/guild';
import { RankSA } from '@/types/ranksa';

const baseEnv = process.env.BACKEND_API_URL;

export async function getRankSA(): Promise<RankSA[]> {
  if (!baseEnv) return [];
  const api = createApiClient(baseEnv);
  try {
    const { data, status } = await api.get('/ranksa');
    if (status !== 200 || !Array.isArray(data)) return [];
    const list: RankSA[] = await Promise.all(
      data.map(async (row: any) => ({
        id: row.id,
        guild: row.guild?.id ? await getGuild(row.guild.id) : null
      }))
    );
    list.sort((a, b) => (b.guild?.castles_count ?? 0) - (a.guild?.castles_count ?? 0));
    return list;
  } catch {
    return [];
  }
}