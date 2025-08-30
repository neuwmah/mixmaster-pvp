import createApiClient from '@/hooks/axios';
import { getCharacter } from '@/app/api/character';
import { Guild } from '@/types/guild';

const baseEnv = process.env.BACKEND_API_URL;

export async function getGuilds(): Promise<Guild[]> {
  if (!baseEnv) return [];
  const api = createApiClient(baseEnv);
  try {
    const { data, status } = await api.get('/guilds');
    if (status !== 200 || !Array.isArray(data)) return [];
    return data as Guild[];
  } catch {
    return [];
  }
}

export async function getGuild(id: string): Promise<Guild | null> {
  if (!baseEnv) return null;
  const api = createApiClient(baseEnv);
  try {
    const { data, status } = await api.get(`/guilds/${id}`);
    if (status !== 200 || !data) return null;
    if (data.master) data.master = await getCharacter(data.master.id);
    return data as Guild;
  } catch {
    return null;
  }
}