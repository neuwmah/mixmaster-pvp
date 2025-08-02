export async function loginUser(username: string, password: string): Promise<Object> {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    return response
  } catch (error) {
    console.error('loginUser error', error);
    return {}
  }
}

export async function logoutUser(): Promise<Boolean> {
  try {
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
    });

    return response.ok ? true : false
  } catch (error) {
    console.error('logoutUser error', error);
    return false
  }
}