export function setAuthToken(token: string): void {
  localStorage.setItem('AuthToken', token)
}

export function getAuthToken(): string | null {
  return localStorage.getItem('AuthToken')
}

export function unsetAuthToken(): void {
  localStorage.removeItem('AuthToken')
}
