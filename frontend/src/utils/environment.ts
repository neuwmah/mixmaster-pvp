const APP_ENV = process.env.NEXT_PUBLIC_APP_ENV || 'staging'
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3333'
const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:3333'

export const _environment = {
  url: APP_URL,
  current: APP_ENV,
  backendAPI: BACKEND_API_URL,
}
