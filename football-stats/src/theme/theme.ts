export type ThemePreference = 'light' | 'dark' | 'system'

const STORAGE_KEY = 'footballStats.theme'

export function getStoredThemePreference(): ThemePreference | null {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (raw === 'light' || raw === 'dark' || raw === 'system') return raw
  return null
}

export function setStoredThemePreference(pref: ThemePreference) {
  localStorage.setItem(STORAGE_KEY, pref)
}

export function resolveTheme(pref: ThemePreference): 'light' | 'dark' {
  if (pref === 'light' || pref === 'dark') return pref
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function applyThemeClass(theme: 'light' | 'dark') {
  document.documentElement.classList.toggle('dark', theme === 'dark')
}

