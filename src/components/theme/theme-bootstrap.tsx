import { useTheme } from 'next-themes'
import { useEffect } from 'react'
import { applyThemePreset, getStoredThemePreset } from '@/lib/theme-presets'

export default function ThemeBootstrap() {
  const { theme, resolvedTheme } = useTheme()

  useEffect(() => {
    const mode = (resolvedTheme ?? theme) === 'dark' ? 'dark' : 'light'
    applyThemePreset(getStoredThemePreset(), mode)
  }, [theme, resolvedTheme])

  return null
}
