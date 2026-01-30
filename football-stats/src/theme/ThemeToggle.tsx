import { LaptopMinimal, Moon, Sun } from 'lucide-react'
import { useTheme } from './ThemeProvider'
import clsx from 'clsx'

const options = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'system', label: 'System', icon: LaptopMinimal },
] as const

export function ThemeToggle() {
  const { preference, setPreference } = useTheme()

  return (
    <div className="inline-flex overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      {options.map((opt) => {
        const Icon = opt.icon
        const active = preference === opt.value
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => setPreference(opt.value)}
            className={clsx(
              'inline-flex items-center gap-2 px-3 py-2 text-xs font-medium transition',
              active
                ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950'
                : 'text-zinc-700 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-900',
            )}
            aria-pressed={active}
          >
            <Icon className="h-4 w-4" />
            <span className="hidden sm:inline">{opt.label}</span>
          </button>
        )
      })}
    </div>
  )
}

