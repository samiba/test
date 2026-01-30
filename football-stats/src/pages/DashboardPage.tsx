import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Link } from 'react-router-dom'
import { Card } from '../components/Card'
import { StatTile } from '../components/StatTile'
import { league, matches, players, teams } from '../data/sampleLeague'
import { formatDecimal, formatNumber } from '../lib/format'
import {
  getGoalsByMatchweek,
  getLeagueTotals,
  getStandings,
  getTopScorers,
} from '../lib/stats'

export function DashboardPage() {
  const totals = getLeagueTotals(matches)
  const standings = getStandings(teams, matches)
  const topScorers = getTopScorers(players, 5)
  const top = topScorers[0]
  const teamById = new Map(teams.map((t) => [t.id, t]))

  const goalsByMW = getGoalsByMatchweek(matches)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          {league.name} • {league.season} • offline sample dataset
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatTile label="Matches played" value={formatNumber(totals.matches)} />
        <StatTile label="Goals scored" value={formatNumber(totals.goals)} />
        <StatTile
          label="Top scorer"
          value={top ? `${top.name}` : '—'}
          subvalue={
            top ? `${top.goals} goals • ${teamById.get(top.teamId)?.name}` : ''
          }
        />
        <StatTile
          label="Avg goals / match"
          value={formatDecimal(totals.avgGoalsPerMatch, 2)}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <div className="flex items-baseline justify-between gap-3">
            <div>
              <div className="text-sm font-semibold">Goals by matchweek</div>
              <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                Simple bar chart of total goals each week
              </div>
            </div>
          </div>

          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={goalsByMW} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="matchweek" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} width={30} />
                <Tooltip
                  contentStyle={{
                    background: 'rgba(9,9,11,0.9)',
                    border: '1px solid rgba(63,63,70,0.6)',
                    borderRadius: 12,
                    color: 'white',
                  }}
                  labelStyle={{ color: 'rgba(228,228,231,0.9)' }}
                />
                <Bar dataKey="goals" fill="#0ea5e9" radius={[8, 8, 2, 2]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <div className="flex items-baseline justify-between gap-3">
            <div>
              <div className="text-sm font-semibold">Table (top 6)</div>
              <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                Points • Goal difference • Goals for
              </div>
            </div>
            <Link
              to="/teams"
              className="text-xs font-semibold text-sky-700 hover:underline dark:text-sky-300"
            >
              View all
            </Link>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[420px] text-left text-sm">
              <thead className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                <tr className="border-b border-zinc-200 dark:border-zinc-800">
                  <th className="py-2 pr-2">#</th>
                  <th className="py-2 pr-2">Team</th>
                  <th className="py-2 pr-2">P</th>
                  <th className="py-2 pr-2">GD</th>
                  <th className="py-2 pr-2">GF</th>
                  <th className="py-2 text-right">Pts</th>
                </tr>
              </thead>
              <tbody>
                {standings.slice(0, 6).map((row, idx) => {
                  const team = teamById.get(row.teamId)
                  return (
                    <tr
                      key={row.teamId}
                      className="border-b border-zinc-100 last:border-b-0 dark:border-zinc-900"
                    >
                      <td className="py-2 pr-2 text-zinc-500 dark:text-zinc-400">
                        {idx + 1}
                      </td>
                      <td className="py-2 pr-2 font-medium">
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
                      <td className="py-2 pr-2 tabular-nums">{row.played}</td>
                      <td className="py-2 pr-2 tabular-nums">{row.goalDiff}</td>
                      <td className="py-2 pr-2 tabular-nums">{row.goalsFor}</td>
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
    </div>
  )
}

