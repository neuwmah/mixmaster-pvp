import createApiClient from '@/hooks/axios';

const baseEnv = process.env.NEXT_PUBLIC_BACKEND_API_URL || process.env.BACKEND_API_URL || ''

export interface MixFormula {
  main_name: string
  main_item: number
  main_race: number
  main_level: number
  main_dropable: number
  sub_name: string
  sub_item: number
  sub_race: number
  sub_level: number
  sub_dropable: number
}

export interface ZoneHabitat {
  zone_idx: number
  zone_name: string
  min_level: number
  max_level: number
  min_mob: number
  max_mob: number
  pk_zone: number
  zone_type: number
  drops: string[]
}

export async function getMixFormulas(henchType: number): Promise<MixFormula[]> {
  if (!baseEnv) return [];
  const api = createApiClient(baseEnv);
  try {
    const { data, status } = await api.get(`/mix/formulas/${henchType}`);
    if (status !== 200 || !Array.isArray(data)) return [];
    return data as MixFormula[];
  } catch (error: any) {
    const s = error?.response?.status;
    if (s === 429 || s === 404) return [];
    return [];
  }
}

export async function getHenchHabitat(henchType: number): Promise<ZoneHabitat[]> {
  if (!baseEnv) return [];
  const api = createApiClient(baseEnv);
  try {
    const { data, status } = await api.get(`/mix/habitat/${henchType}`);
    if (status !== 200 || !Array.isArray(data)) return [];
    return data as ZoneHabitat[];
  } catch (error: any) {
    const s = error?.response?.status;
    if (s === 429 || s === 404) return [];
    return [];
  }
}
