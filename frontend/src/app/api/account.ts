export async function loginUser(username: string, password: string): Promise<Response> {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    return response
  } catch (error) {
    console.error('loginUser error', error);
    throw error
  }
}

export async function logoutUser(): Promise<boolean> {
  try {
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
    });

    return response.ok
  } catch (error) {
    console.error('logoutUser error', error);
    return false
  }
}
