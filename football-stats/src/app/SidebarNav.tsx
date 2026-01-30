import { BarChart3, CalendarDays, Shield, Users } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import clsx from 'clsx'
import type { ComponentType } from 'react'

const nav = [
  { to: '/', label: 'Dashboard', icon: BarChart3, end: true },
  { to: '/teams', label: 'Teams', icon: Shield },
  { to: '/players', label: 'Players', icon: Users },
  { to: '/matches', label: 'Matches', icon: CalendarDays },
] as const

function NavItem({
  to,
  label,
  icon: Icon,
  end,
}: {
  to: string
  label: string
  icon: ComponentType<{ className?: string }>
  end?: boolean
}) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        clsx(
          'group flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition',
          isActive
            ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950'
            : 'text-zinc-700 hover:bg-zinc-200/70 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-zinc-50',
        )
      }
    >
      <Icon className="h-4 w-4 opacity-80 group-hover:opacity-100" />
      <span>{label}</span>
    </NavLink>
  )
}

export function SidebarNav() {
  return (
    <aside className="hidden w-64 flex-none border-r border-zinc-200 bg-zinc-50/50 p-4 dark:border-zinc-800 dark:bg-zinc-950/30 md:block">
      <div className="mb-4 rounded-xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="text-sm font-semibold">Football Stats</div>
        <div className="text-xs text-zinc-500 dark:text-zinc-400">
          Sample league dataset
        </div>
      </div>

      <nav className="space-y-1">
        {nav.map((item) => (
          <NavItem
            key={item.to}
            to={item.to}
            label={item.label}
            icon={item.icon}
            end={'end' in item ? item.end : undefined}
          />
        ))}
      </nav>

      <div className="mt-6 text-xs text-zinc-500 dark:text-zinc-400">
        Tip: Use the theme toggle in the top bar.
      </div>
    </aside>
  )
}

