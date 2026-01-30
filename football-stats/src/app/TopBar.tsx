import { Menu, Search } from 'lucide-react'
import { ThemeToggle } from '../theme/ThemeToggle'

export function TopBar() {
  return (
    <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/60">
      <div className="flex items-center gap-3 px-4 py-3 sm:px-6">
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg border border-zinc-200 bg-white p-2 text-zinc-700 shadow-sm transition hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-900 md:hidden"
          aria-label="Menu (not implemented)"
        >
          <Menu className="h-4 w-4" />
        </button>

        <div className="flex flex-1 items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-600 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-400">
          <Search className="h-4 w-4 opacity-70" />
          <span className="truncate">
            Search is per-page (Teams/Players/Matches)
          </span>
        </div>

        <ThemeToggle />
      </div>
    </header>
  )
}

