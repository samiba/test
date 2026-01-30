import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from '../components/Card'
import { league, matches, teams } from '../data/sampleLeague'
import { getStandings } from '../lib/stats'
import { formatDecimal } from '../lib/format'

export function TeamsPage() {
  const [query, setQuery] = React.useState('')
  const teamById = new Map(teams.map((t) => [t.id, t]))
  const standings = getStandings(teams, matches)

  const filtered = standings.filter((row) => {
    const name = teamById.get(row.teamId)?.name ?? row.teamId
    return name.toLowerCase().includes(query.trim().toLowerCase())
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Teams</h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            {league.name} • table + expected goals (xG)
          </p>
        </div>
        <div className="w-full sm:w-80">
          <label className="sr-only" htmlFor="team-search">
            Search teams
          </label>
          <input
            id="team-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search teams…"
            className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm shadow-sm outline-none ring-sky-400/30 focus:ring-4 dark:border-zinc-800 dark:bg-zinc-950"
          />
        </div>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              <tr className="border-b border-zinc-200 dark:border-zinc-800">
                <th className="py-2 pr-3">#</th>
                <th className="py-2 pr-3">Team</th>
                <th className="py-2 pr-3">P</th>
                <th className="py-2 pr-3">W</th>
                <th className="py-2 pr-3">D</th>
                <th className="py-2 pr-3">L</th>
                <th className="py-2 pr-3">GF</th>
                <th className="py-2 pr-3">GA</th>
                <th className="py-2 pr-3">GD</th>
                <th className="py-2 pr-3">xGD</th>
                <th className="py-2 text-right">Pts</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row) => {
                const team = teamById.get(row.teamId)
                const rank = standings.findIndex((x) => x.teamId === row.teamId) + 1
                return (
                  <tr
                    key={row.teamId}
                    className="border-b border-zinc-100 last:border-b-0 dark:border-zinc-900"
                  >
                    <td className="py-2 pr-3 text-zinc-500 dark:text-zinc-400">
                      {rank}
                    </td>
                    <td className="py-2 pr-3 font-medium">
                      <Link
                        to={`/teams/${row.teamId}`}
                        className="inline-flex items-center gap-2 hover:underline"
                      >
                        <span
                          className="h-2.5 w-2.5 rounded-full"
                          style={{ background: team?.color ?? '#a1a1aa' }}
                        />
                        {team?.name ?? row.teamId}
                      </Link>
                    </td>
                    <td className="py-2 pr-3 tabular-nums">{row.played}</td>
                    <td className="py-2 pr-3 tabular-nums">{row.wins}</td>
                    <td className="py-2 pr-3 tabular-nums">{row.draws}</td>
                    <td className="py-2 pr-3 tabular-nums">{row.losses}</td>
                    <td className="py-2 pr-3 tabular-nums">{row.goalsFor}</td>
                    <td className="py-2 pr-3 tabular-nums">{row.goalsAgainst}</td>
                    <td className="py-2 pr-3 tabular-nums">{row.goalDiff}</td>
                    <td className="py-2 pr-3 tabular-nums">
                      {formatDecimal(row.xgDiff, 1)}
                    </td>
                    <td className="py-2 text-right tabular-nums font-semibold">
                      {row.points}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

