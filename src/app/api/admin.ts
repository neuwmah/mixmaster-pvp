import createApiClient from '@/hooks/axios';

const baseURL = `${process.env.NEXT_PUBLIC_DATABASE_URL}/admin`;

export async function checkAdmin(id: string): Promise<boolean> {
  const api = createApiClient(baseURL + `/${id}`);
  try {
    const response = await api.get('/', {
      validateStatus: function (status) {
        return (status >= 200 && status < 300) || status === 404;
      },
    });

    return response.status === 200;

  } catch (error) {
    console.error('checkAdmin error', error);
    return false;
  }
}