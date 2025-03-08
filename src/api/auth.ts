import { getAuthToken } from '@/utils/authToken'
import { ApiUrl, DeleteReqBase, GetReqBase, PostReqBase } from '@/utils/constants'

export async function getUserInfo(): Promise<IAuthGetResponse> {
  try {
    const res = await fetch(`${ApiUrl}/auth`, {
      ...GetReqBase,
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    })
    if (res.ok) {
      const data: IAuthGetResponse = await res.json()
      return data
    }
    switch (res.status) {
      case 401:
        throw new Error('Требуется авторизация')
      default:
        throw new Error(`Запрос не удался, код ответа сервера, ${res.status}`)
    }
  } catch (error) {
    throw error
  }
}

export async function login(email: string, pass: string): Promise<ILoginResponse> {
  try {
    const res = await fetch(`${ApiUrl}/auth`, {
      ...PostReqBase,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password: pass,
      }),
    })
    if (res.ok) {
      const data: ILoginResponse = await res.json()
      return data
    }
    switch (res.status) {
      case 400:
        throw new Error('Ошибка в запросе')
      case 404:
        throw new Error('Комбинация логин/пароль не найдена')
      default:
        throw new Error(`Запрос не удался, код ответа сервера ${res.status}`)
    }
  } catch (error) {
    throw error
  }
}

export async function logout(): Promise<void> {
  try {
    const res = await fetch(`${ApiUrl}/auth`, {
      ...DeleteReqBase,
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    })
    return
  } catch (error) {
    throw error
  }
}
