import createApiClient from '@/hooks/axios';
import { User } from '@/types/user';

const baseEnv = process.env.BACKEND_API_URL;

export async function getUsers(): Promise<User[]> {
  if (!baseEnv) return [];
  const api = createApiClient(baseEnv);
  try {
    const { data, status } = await api.get('/users');
    if (status !== 200 || !Array.isArray(data)) return [];
    return data as User[];
  } catch {
    return [];
  }
}

export async function getUser(id: string): Promise<User | null> {
  if (!baseEnv) return null;
  const api = createApiClient(baseEnv);
  try {
    const { data, status } = await api.get(`/users/${id}`);
    if (status !== 200 || !data) return null;
    return data as User;
  } catch {
    return null;
  }
}

export async function getUserByUsername(username: string): Promise<User | null> {
  try {
    const users = await getUsers();
    return users.find(u => u.username === username) || null;
  } catch {
    return null;
  }
}

export async function getUserByCredentials(username: string, password: string): Promise<User | null> {
  try {
    const users = await getUsers();
    return users.find(u => u.username === username && u.password === password) || null;
  } catch {
    return null;
  }
}

export async function createUser(paramsData: Partial<User>): Promise<User | null> {
  if (!baseEnv) return null;
  const api = createApiClient(baseEnv);
  const date = new Date();
  const userData = {
    ...paramsData,
    created_at: date,
    characters: [],
    online_status: false,
    online_time: 0,
    online_points: 0,
    last_connection_date: date,
    last_connection_ip: ""
  } as Partial<User>;
  try {
    const { data, status } = await api.post('/users', userData);
    if (status !== 201 || !data) return null;
    return data as User;
  } catch {
    return null;
  }
}