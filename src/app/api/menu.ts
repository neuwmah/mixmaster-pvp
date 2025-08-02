import { Menu } from '@/types/menu';
import createApiClient from '@/hooks/axios';

const baseURL = `${process.env.DATABASE_URL}/menus`;

export async function getMenus(): Promise<Menu[]> {
  const api = createApiClient(baseURL);
  try {
    const response = await api.get('/');

    if (response.data)
      return response.data

    return []
  } catch (error) {
    console.error('getMenus error', error);
    return []
  }
}

export async function getMenu(id: String): Promise<Menu | null> {
  const api = createApiClient(baseURL + `/${id}`);
  try {
    const response = await api.get('/');
    
    if (response.data)
      return response.data

    return null
  } catch (error) {
    console.error('getMenu error', error);
    return null
  }
}