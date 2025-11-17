import createApiClient from '@/hooks/axios';
import { Hero, RankHero } from '@/types/hero';

const baseEnv = process.env.BACKEND_API_URL;

export async function getHeroRanking(): Promise<RankHero[]> {
  if (!baseEnv) return [];
  const api = createApiClient(baseEnv);
  try {
    const { data, status } = await api.get('/heroes/ranking');
    if (status !== 200 || !Array.isArray(data)) return [];
    
    const result = data.map((hero: Hero) => ({
      id: `${hero.id_idx}-${hero.hero_order}`,
      hero
    })) as RankHero[];
    
    return result;
  } catch {
    return [];
  }
}
