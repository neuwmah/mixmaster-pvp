import createApiClient from '@/hooks/axios';
import { Item } from '@/types/item';

const baseEnv = process.env.NEXT_PUBLIC_BACKEND_API_URL || process.env.BACKEND_API_URL || ''

export async function getItems(characterClass?: string): Promise<Item[]> {
  if (!baseEnv) return [];
  const api = createApiClient(baseEnv);
  try {
    const { data, status } = await api.get('/items');
    if (status !== 200 || !Array.isArray(data)) return [];
    let items = data as Item[];
    if (characterClass) {
      const classLower = characterClass.toLowerCase();
      items = items.filter(item => {
        const name = item.name?.toLowerCase() || '';
        if (classLower === 'ditt') {
          return !name.includes('knuckle') && !name.includes('bow') && !name.includes('gun');
        }
        if (classLower === 'jin') {
          return !name.includes('sword') && !name.includes('bow') && !name.includes('gun');
        }
        if (classLower === 'penril') {
          return !name.includes('sword') && !name.includes('knuckle') && !name.includes('gun');
        }
        if (classLower === 'phoy') {
          return !name.includes('sword') && !name.includes('knuckle') && !name.includes('bow');
        }
        return true;
      });
    }
    return items;
  } catch (error: any) {
    const s = error?.response?.status;
    if (s === 429 || s === 404) return [];
    return [];
  }
}