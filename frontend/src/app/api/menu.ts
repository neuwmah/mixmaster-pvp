import createApiClient from '@/hooks/axios';
import { Menu } from '@/types/menu';

const baseEnv = process.env.BACKEND_API_URL;

export async function getMenus(): Promise<Menu[]> {
  if (!baseEnv) return [];
  const api = createApiClient(baseEnv);
  try {
    const { data, status } = await api.get('/menus');
    if (status !== 200 || !Array.isArray(data)) return [];
    return data as Menu[];
  } catch (error: any) {
    const s = error?.response?.status;
    if (s === 429 || s === 404) return [];
    return [];
  }
}

export async function getMenu(id: string): Promise<Menu | null> {
  if (!baseEnv) return null;
  const api = createApiClient(baseEnv);
  try {
    const { data, status } = await api.get(`/menus/${id}`);
    if (status !== 200 || !data) return null;
    if (data?.id) return data as Menu;
    if (data?.data?.id) return data.data as Menu;
    return null;
  } catch (error: any) {
    const s = error?.response?.status;
    if (s === 429 || s === 404) return null;
    return null;
  }
}