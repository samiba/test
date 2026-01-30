import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
          404
        </div>
        <h1 className="mt-1 text-2xl font-semibold">Page not found</h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          The page you’re looking for doesn’t exist.
        </p>
        <div className="mt-4">
          <Link
            to="/"
            className="inline-flex rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-200"
          >
            Go to dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}

