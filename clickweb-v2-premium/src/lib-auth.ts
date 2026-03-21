export type UserPlan = 'free' | 'solo-web' | 'basico' | 'pro' | 'business'
export interface AuthUser { id: string; email: string; plan: UserPlan; name?: string }
const TOKEN_KEY = 'clickweb_token'
const USER_KEY = 'clickweb_user'
export function getStoredToken() { if (typeof window === 'undefined') return ''; return localStorage.getItem(TOKEN_KEY) || '' }
export function setStoredAuth(token: string, user: AuthUser) { if (typeof window === 'undefined') return; localStorage.setItem(TOKEN_KEY, token); localStorage.setItem(USER_KEY, JSON.stringify(user)) }
export function clearStoredAuth() { if (typeof window === 'undefined') return; localStorage.removeItem(TOKEN_KEY); localStorage.removeItem(USER_KEY) }
export function getStoredUser(): AuthUser | null { if (typeof window === 'undefined') return null; const raw = localStorage.getItem(USER_KEY); if (!raw) return null; try { return JSON.parse(raw) as AuthUser } catch { return null } }
export async function api<T = any>(url: string, init: RequestInit = {}) { const token = getStoredToken(); const headers = new Headers(init.headers || {}); if (token) headers.set('Authorization', `Bearer ${token}`); if (!headers.has('Content-Type') && init.body) headers.set('Content-Type', 'application/json'); const res = await fetch(url, { ...init, headers }); const text = await res.text(); const data = text ? (() => { try { return JSON.parse(text) } catch { return text } })() : null; if (!res.ok) { const msg = typeof data === 'object' && data && 'error' in data ? (data as any).error : 'Error'; throw new Error(msg) } return data as T }
