import { getAuthToken } from '@/utils/authToken'
import { ApiUrl, DeleteReqBase, GetReqBase, PostReqBase } from '@/utils/constants'

export async function getNotes(): Promise<INote[] | null> {
  try {
    const res = await fetch(`${ApiUrl}/notes`, {
      ...GetReqBase,
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    })
    if (res.ok) {
      const data: INote[] | null = await res.json()
      return data
    }
    switch (res.status) {
      case 401:
        throw new Error('Требуется авторизация')
      default:
        throw new Error(`Запрос не удался, код ответа сервера ${res.status}`)
    }
  } catch (error) {
    throw error
  }
}

export async function createNote(note: ICreateNote): Promise<INote> {
  try {
    const res = await fetch(`${ApiUrl}/notes`, {
      ...PostReqBase,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getAuthToken()}`,
      },
      body: JSON.stringify({...note}),
    })
    if (res.ok) {
      const data: INote = await res.json()
      return data
    }
    switch (res.status) {
      case 400:
        throw new Error('Ошибка в запросе')
      case 401:
        throw new Error('Требуется авторизация')
      default:
        throw new Error(`Запрос не удался, код ответа сервера ${res.status}`)
    }
  } catch (error) {
    throw error
  }
}

export async function deleteNote(id: number): Promise<void> {
  try {
    const res = await fetch(`${ApiUrl}/notes/${id}`, {
      ...DeleteReqBase,
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    })
    if (res.ok) {
      return
    }
    switch (res.status) {
      case 401:
        throw new Error('Требуется авторизация')
      case 404:
        throw new Error('Заметка не найдена')
      default:
        throw new Error(`Запрос не удался, код ответа сервера ${res.status}`)
    }
  } catch (error) {
    throw error
  }
}
