import { ApiUrl, PostReqBase } from '@/utils/constants'

export async function register(
  email: string,
  pass: string,
  passConf: string,
): Promise<IRegistrationResponse> {
  try {
    const res = await fetch(`${ApiUrl}/reg`, {
      ...PostReqBase,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password: pass,
        confirm_password: passConf,
      }),
    })
    if (res.ok) {
      const data: IRegistrationResponse = await res.json()
      return data
    }
    switch (res.status) {
      case 400:
        throw new Error('Ошибка запроса')
      case 409:
        throw new Error('Пользователь с таким e-mail уже зарегистрирован')
      default:
        throw new Error(`Запрос не удался, код ответа сервера ${res.status}`)
    }
  } catch (error) {
    throw error
  }
}
