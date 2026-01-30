import React from 'react'
import {
  applyThemeClass,
  getStoredThemePreference,
  resolveTheme,
  setStoredThemePreference,
  type ThemePreference,
} from './theme'
import { ThemeContext } from './ThemeContext'

function computeInitialPreference(): ThemePreference {
  try {
    return getStoredThemePreference() ?? 'system'
  } catch {
    return 'system'
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [preference, setPreferenceState] = React.useState<ThemePreference>(
    computeInitialPreference,
  )
  const [resolved, setResolved] = React.useState<'light' | 'dark'>(() => {
    try {
      return resolveTheme(computeInitialPreference())
    } catch {
      return 'light'
    }
  })

  const setPreference = React.useCallback((pref: ThemePreference) => {
    setPreferenceState(pref)
    try {
      setStoredThemePreference(pref)
    } catch {
      // ignore
    }
  }, [])

  React.useEffect(() => {
    const nextResolved = resolveTheme(preference)
    setResolved(nextResolved)
    applyThemeClass(nextResolved)
  }, [preference])

  React.useEffect(() => {
    if (preference !== 'system') return
    const mql = window.matchMedia?.('(prefers-color-scheme: dark)')
    if (!mql) return

    const handler = () => {
      const nextResolved = resolveTheme('system')
      setResolved(nextResolved)
      applyThemeClass(nextResolved)
    }

    mql.addEventListener?.('change', handler)
    return () => mql.removeEventListener?.('change', handler)
  }, [preference])

  return (
    <ThemeContext.Provider value={{ preference, resolved, setPreference }}>
      {children}
    </ThemeContext.Provider>
  )
}

