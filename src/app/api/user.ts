import { User } from '@/types/user';
import createApiClient from '@/hooks/axios';

const baseURL = `${process.env.NEXT_PUBLIC_DATABASE_URL}/users`;

export async function getUsers(): Promise<User[]> {
  const api = createApiClient(baseURL);
  try {
    const response = await api.get('/');

    return response.data || []
  } catch (error) {
    console.error('getUsers error', error);
    return []
  }
}

export async function getUser(id: String): Promise<User | null> {
  const api = createApiClient(baseURL + `/${id}`);
  try {
    const response = await api.get('/');
    
    return response.data || null
  } catch (error) {
    console.error('getUser error', error);
    return null
  }
}

export async function createUser(userData: Partial<User>): Promise<User | null> {
  const api = createApiClient(baseURL);
  try {
    const response = await api.post('/', userData);
    
    return response.data || null
  } catch (error) {
    console.error('createUser error', error);
    return null
  }
}

export async function getUserByCredentials(username: string, password: string): Promise<User | null> {
  try {
    const users = await getUsers();
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    return user || null
  } catch (error) {
    console.error('getUserByCredentials error', error);
    return null
  }
}