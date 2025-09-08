import createApiClient from '@/hooks/axios';
import { Changelog } from '@/types/changelog';

const baseEnv = process.env.NEXT_PUBLIC_BACKEND_API_URL || process.env.BACKEND_API_URL || ''

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

export async function updateChangelogField(id: string, data: Partial<Pick<Changelog, 'title' | 'content1' | 'content2' | 'image_src' | 'slug' | 'active'>>): Promise<Changelog | null> {
  try {
    const res = await fetch(`/api/changelog/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
    if (!res.ok) return null
    const json = await res.json()
    if (!json?.id) return null
    return json as Changelog
  } catch { return null }
}

export async function createChangelog(data: Pick<Changelog, 'slug' | 'title' | 'image_src'> & Partial<Pick<Changelog,'content1'|'content2'>>): Promise<Changelog | null> {
  if (!baseEnv) return null;
  const api = createApiClient(baseEnv);
  try {
    const { data: res, status } = await api.post('/changelog', data);
    if (status !== 201 || !res?.id) return null;
    return res as Changelog;
  } catch {
    return null;
  }
}

export async function deleteChangelog(id: string): Promise<boolean> {
  if (!baseEnv) return false;
  const api = createApiClient(baseEnv);
  try {
    const { status } = await api.delete(`/changelog/${id}`);
    return status === 204 || status === 200;
  } catch {
    return false;
  }
}