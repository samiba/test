import clsx from 'clsx'

export function Badge({
  children,
  tone = 'neutral',
}: {
  children: React.ReactNode
  tone?: 'neutral' | 'success' | 'danger' | 'warning'
}) {
  const toneClass =
    tone === 'success'
      ? 'border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-200'
      : tone === 'danger'
        ? 'border-rose-200 bg-rose-50 text-rose-900 dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-200'
        : tone === 'warning'
          ? 'border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-200'
          : 'border-zinc-200 bg-zinc-50 text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-200'

  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold',
        toneClass,
      )}
    >
      {children}
    </span>
  )
}

