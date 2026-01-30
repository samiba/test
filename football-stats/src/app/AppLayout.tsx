import { Outlet } from 'react-router-dom'
import { SidebarNav } from './SidebarNav'
import { TopBar } from './TopBar'

export function AppLayout() {
  return (
    <div className="min-h-dvh bg-zinc-50 text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
      <div className="mx-auto flex min-h-dvh max-w-7xl">
        <SidebarNav />
        <div className="flex min-w-0 flex-1 flex-col">
          <TopBar />
          <main className="flex-1 p-4 sm:p-6">
            <Outlet />
          </main>
          <footer className="border-t border-zinc-200 px-4 py-4 text-sm text-zinc-600 dark:border-zinc-800 dark:text-zinc-400 sm:px-6">
            Sample football stats dashboard (offline dataset)
          </footer>
        </div>
      </div>
    </div>
  )
}

