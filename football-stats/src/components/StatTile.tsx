import { Card } from './Card'

export function StatTile({
  label,
  value,
  subvalue,
}: {
  label: string
  value: string
  subvalue?: string
}) {
  return (
    <Card className="p-5">
      <div className="text-sm text-zinc-600 dark:text-zinc-400">{label}</div>
      <div className="mt-1 text-2xl font-semibold tracking-tight">{value}</div>
      {subvalue ? (
        <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
          {subvalue}
        </div>
      ) : null}
    </Card>
  )
}

