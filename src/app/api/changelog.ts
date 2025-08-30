import createApiClient from '@/hooks/axios';
import { Changelog } from '@/types/changelog';

const baseEnv = process.env.BACKEND_API_URL;

export async function getChangelogs(): Promise<Changelog[]> {
  if (!baseEnv) return [];
  const api = createApiClient(baseEnv);
  try {
    const { data, status } = await api.get('/changelog');
    if (status !== 200 || !Array.isArray(data)) return [];
    return data as Changelog[];
  } catch (error: any) {
    const s = error?.response?.status;
    if (s === 429 || s === 404) return [];
    return [];
  }
}

export async function getChangelog(id: string): Promise<Changelog | null> {
  if (!baseEnv) return null;
  const api = createApiClient(baseEnv);
  try {
    const { data, status } = await api.get(`/changelog/${id}`);
    if (status !== 200 || !data) return null;
    if (data?.id) return data as Changelog;
    if (data?.data?.id) return data.data as Changelog;
    return null;
  } catch (error: any) {
    const s = error?.response?.status;
    if (s === 429 || s === 404) return null;
    return null;
  }
}