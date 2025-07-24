import { Menu } from '@/types/menu';
import createApiClient from '@/hooks/axios';

const baseURL = 'https://6881b09866a7eb81224b86cb.mockapi.io/apipvp/v1/menus';

export async function getMenus(): Promise<Menu[]> {
  const api = createApiClient(baseURL);
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error) {
    console.error('getMenus error', error);
    return [];
  }
}