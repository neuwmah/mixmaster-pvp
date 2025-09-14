import createApiClient from '@/hooks/axios';
import { Hench } from '@/types/hench';

const baseEnv = process.env.NEXT_PUBLIC_BACKEND_API_URL || process.env.BACKEND_API_URL || ''

export async function getHenchs(): Promise<Hench[]> {
  if (!baseEnv) return [];
  const api = createApiClient(baseEnv);
  try {
    const { data, status } = await api.get('/hench');
    if (status !== 200 || !Array.isArray(data)) return [];
    return data as Hench[];
  } catch (error: any) {
    const s = error?.response?.status;
    if (s === 429 || s === 404) return [];
    return [];
  }
}