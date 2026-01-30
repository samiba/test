import React from 'react'
import { Card } from '../components/Card'
import { league, players, teams, type Player } from '../data/sampleLeague'
import { formatDecimal, formatNumber } from '../lib/format'

type SortKey = 'goals' | 'assists' | 'minutes' | 'xg' | 'name'
type SortDir = 'asc' | 'desc'

function sortPlayers(rows: Player[], key: SortKey, dir: SortDir) {
  const mult = dir === 'asc' ? 1 : -1
  return rows.slice().sort((a, b) => {
    if (key === 'name') return mult * a.name.localeCompare(b.name)
    const av = a[key]
    const bv = b[key]
    if (bv !== av) return mult * (av < bv ? -1 : 1)
    return a.name.localeCompare(b.name)
  })
}

export function PlayersPage() {
  const [query, setQuery] = React.useState('')
  const [teamId, setTeamId] = React.useState<string>('all')
  const [sortKey, setSortKey] = React.useState<SortKey>('goals')
  const [sortDir, setSortDir] = React.useState<SortDir>('desc')

  const teamById = new Map(teams.map((t) => [t.id, t]))

  const filtered = players.filter((p) => {
    const q = query.trim().toLowerCase()
    if (teamId !== 'all' && p.teamId !== teamId) return false
    if (!q) return true
    const teamName = teamById.get(p.teamId)?.name ?? ''
    return (
      p.name.toLowerCase().includes(q) ||
      teamName.toLowerCase().includes(q) ||
      p.nationality.toLowerCase().includes(q)
    )
  })

  const sorted = sortPlayers(filtered, sortKey, sortDir)

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    else {
      setSortKey(key)
      setSortDir(key === 'name' ? 'asc' : 'desc')
    }
  }

  const SortTh = ({
    label,
    keyName,
    align = 'left',
  }: {
    label: string
    keyName: SortKey
    align?: 'left' | 'right'
  }) => {
    const active = sortKey === keyName
    const arrow = active ? (sortDir === 'asc' ? ' ↑' : ' ↓') : ''
    return (
      <th
        className={align === 'right' ? 'py-2 text-right' : 'py-2 pr-3'}
      >
        <button
          type="button"
          onClick={() => toggleSort(keyName)}
          className="font-semibold hover:underline"
        >
          {label}
          {arrow}
        </button>
      </th>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Players</h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            {league.name} • {league.season} • leaderboard
          </p>
        </div>
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search players / team / nation…"
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
                <SortTh label="Player" keyName="name" />
                <th className="py-2 pr-3">Team</th>
                <th className="py-2 pr-3">Pos</th>
                <th className="py-2 pr-3">Nation</th>
                <SortTh label="Min" keyName="minutes" />
                <SortTh label="G" keyName="goals" />
                <SortTh label="A" keyName="assists" />
                <SortTh label="xG" keyName="xg" align="right" />
              </tr>
            </thead>
            <tbody>
              {sorted.map((p) => (
                <tr
                  key={p.id}
                  className="border-b border-zinc-100 last:border-b-0 dark:border-zinc-900"
                >
                  <td className="py-2 pr-3 font-medium">{p.name}</td>
                  <td className="py-2 pr-3">
                    {teamById.get(p.teamId)?.name ?? p.teamId}
                  </td>
                  <td className="py-2 pr-3 text-zinc-600 dark:text-zinc-400">
                    {p.position}
                  </td>
                  <td className="py-2 pr-3 text-zinc-600 dark:text-zinc-400">
                    {p.nationality}
                  </td>
                  <td className="py-2 pr-3 tabular-nums">{formatNumber(p.minutes)}</td>
                  <td className="py-2 pr-3 tabular-nums font-semibold">{p.goals}</td>
                  <td className="py-2 pr-3 tabular-nums">{p.assists}</td>
                  <td className="py-2 text-right tabular-nums">
                    {formatDecimal(p.xg, 1)}
                  </td>
                </tr>
              ))}
              {sorted.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="py-6 text-center text-sm text-zinc-600 dark:text-zinc-400"
                  >
                    No players match your filters.
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

