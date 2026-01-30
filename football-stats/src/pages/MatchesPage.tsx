import React from 'react'
import { Badge } from '../components/Badge'
import { Card } from '../components/Card'
import { league, matches, teams } from '../data/sampleLeague'
import { formatDateShort, formatDecimal } from '../lib/format'

export function MatchesPage() {
  const [teamId, setTeamId] = React.useState<string>('all')
  const [query, setQuery] = React.useState('')
  const teamById = new Map(teams.map((t) => [t.id, t]))

  const filtered = matches
    .filter((m) => {
      if (teamId === 'all') return true
      return m.homeTeamId === teamId || m.awayTeamId === teamId
    })
    .filter((m) => {
      const q = query.trim().toLowerCase()
      if (!q) return true
      const home = teamById.get(m.homeTeamId)?.name ?? m.homeTeamId
      const away = teamById.get(m.awayTeamId)?.name ?? m.awayTeamId
      return (
        home.toLowerCase().includes(q) ||
        away.toLowerCase().includes(q) ||
        String(m.matchweek).includes(q)
      )
    })
    .slice()
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : b.matchweek - a.matchweek))

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Matches</h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            {league.name} • {league.season} • results & xG
          </p>
        </div>
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search teams / matchweek…"
            className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm shadow-sm outline-none ring-sky-400/30 focus:ring-4 dark:border-zinc-800 dark:bg-zinc-950 sm:w-72"
          />
          <select
            value={teamId}
            onChange={(e) => setTeamId(e.target.value)}
            className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm shadow-sm outline-none ring-sky-400/30 focus:ring-4 dark:border-zinc-800 dark:bg-zinc-950 sm:w-56"
          >
            <option value="all">All teams</option>
            {teams.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              <tr className="border-b border-zinc-200 dark:border-zinc-800">
                <th className="py-2 pr-3">Date</th>
                <th className="py-2 pr-3">MW</th>
                <th className="py-2 pr-3">Home</th>
                <th className="py-2 pr-3">Score</th>
                <th className="py-2 pr-3">Away</th>
                <th className="py-2 pr-3">xG (H–A)</th>
                <th className="py-2">Result</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((m) => {
                const home = teamById.get(m.homeTeamId)
                const away = teamById.get(m.awayTeamId)
                const result =
                  m.homeGoals > m.awayGoals ? 'H' : m.homeGoals < m.awayGoals ? 'A' : 'D'
                const tone =
                  result === 'H' ? 'success' : result === 'A' ? 'danger' : 'neutral'

                return (
                  <tr
                    key={m.id}
                    className="border-b border-zinc-100 last:border-b-0 dark:border-zinc-900"
                  >
                    <td className="py-2 pr-3 text-zinc-600 dark:text-zinc-400">
                      {formatDateShort(m.date)}
                    </td>
                    <td className="py-2 pr-3 tabular-nums">{m.matchweek}</td>
                    <td className="py-2 pr-3 font-medium">
                      <span className="inline-flex items-center gap-2">
                        <span
                          className="h-2.5 w-2.5 rounded-full"
                          style={{ background: home?.color ?? '#a1a1aa' }}
                        />
                        {home?.name ?? m.homeTeamId}
                      </span>
                    </td>
                    <td className="py-2 pr-3 tabular-nums font-semibold">
                      {m.homeGoals}–{m.awayGoals}
                    </td>
                    <td className="py-2 pr-3 font-medium">
                      <span className="inline-flex items-center gap-2">
                        <span
                          className="h-2.5 w-2.5 rounded-full"
                          style={{ background: away?.color ?? '#a1a1aa' }}
                        />
                        {away?.name ?? m.awayTeamId}
                      </span>
                    </td>
                    <td className="py-2 pr-3 tabular-nums text-zinc-600 dark:text-zinc-400">
                      {formatDecimal(m.homeXg, 1)}–{formatDecimal(m.awayXg, 1)}
                    </td>
                    <td className="py-2">
                      <Badge tone={tone}>
                        {result === 'H' ? 'Home win' : result === 'A' ? 'Away win' : 'Draw'}
                      </Badge>
                    </td>
                  </tr>
                )
              })}
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="py-6 text-center text-sm text-zinc-600 dark:text-zinc-400"
                  >
                    No matches match your filters.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

