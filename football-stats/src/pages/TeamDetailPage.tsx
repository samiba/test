import { Link, useParams } from 'react-router-dom'
import { Badge } from '../components/Badge'
import { Card } from '../components/Card'
import { league, matches, players, teams } from '../data/sampleLeague'
import { formatDateShort, formatDecimal } from '../lib/format'
import { getStandings, getTeamForm } from '../lib/stats'

export function TeamDetailPage() {
  const { teamId } = useParams()
  const team = teams.find((t) => t.id === teamId)

  const standings = getStandings(teams, matches)
  const row = standings.find((r) => r.teamId === teamId)
  const form = teamId ? getTeamForm(matches, teamId, 5) : []

  const teamPlayers = players
    .filter((p) => p.teamId === teamId)
    .slice()
    .sort((a, b) => {
      if (b.goals !== a.goals) return b.goals - a.goals
      if (b.assists !== a.assists) return b.assists - a.assists
      if (b.xg !== a.xg) return b.xg - a.xg
      return a.name.localeCompare(b.name)
    })

  return (
    <div className="space-y-6">
      <div>
        <div className="text-sm text-zinc-600 dark:text-zinc-400">
          <Link className="underline" to="/teams">
            Teams
          </Link>{' '}
          / {team?.name ?? teamId}
        </div>
        <h1 className="mt-1 inline-flex items-center gap-3 text-2xl font-semibold">
          <span
            className="h-3 w-3 rounded-full"
            style={{ background: team?.color ?? '#a1a1aa' }}
          />
          {team?.name ?? 'Unknown team'}
        </h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          {league.name} • {league.season}
        </p>
      </div>

      {!team || !row ? (
        <Card>
          <div className="text-sm">
            Team not found.{' '}
            <Link className="underline" to="/teams">
              Back to teams
            </Link>
          </div>
        </Card>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <Card className="p-5">
              <div className="text-sm text-zinc-600 dark:text-zinc-400">Position</div>
              <div className="mt-1 text-2xl font-semibold">
                {standings.findIndex((r) => r.teamId === team.id) + 1}
              </div>
            </Card>
            <Card className="p-5">
              <div className="text-sm text-zinc-600 dark:text-zinc-400">Points</div>
              <div className="mt-1 text-2xl font-semibold">{row.points}</div>
              <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                {row.wins}W {row.draws}D {row.losses}L • {row.played} played
              </div>
            </Card>
            <Card className="p-5">
              <div className="text-sm text-zinc-600 dark:text-zinc-400">Goal diff</div>
              <div className="mt-1 text-2xl font-semibold">{row.goalDiff}</div>
              <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                {row.goalsFor} for • {row.goalsAgainst} against
              </div>
            </Card>
            <Card className="p-5">
              <div className="text-sm text-zinc-600 dark:text-zinc-400">xG diff</div>
              <div className="mt-1 text-2xl font-semibold">
                {formatDecimal(row.xgDiff, 1)}
              </div>
              <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                xGF {formatDecimal(row.xgFor, 1)} • xGA {formatDecimal(row.xgAgainst, 1)}
              </div>
            </Card>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <div className="text-sm font-semibold">Recent form (last 5)</div>
              <div className="mt-3 space-y-2">
                {form.length === 0 ? (
                  <div className="text-sm text-zinc-600 dark:text-zinc-400">
                    No matches yet.
                  </div>
                ) : (
                  form.map(({ match, result, gf, ga }) => {
                    const opponentId =
                      match.homeTeamId === team.id ? match.awayTeamId : match.homeTeamId
                    const opponent = teams.find((t) => t.id === opponentId)
                    const tone =
                      result === 'W'
                        ? 'success'
                        : result === 'L'
                          ? 'danger'
                          : 'neutral'

                    return (
                      <div
                        key={match.id}
                        className="flex items-center justify-between gap-3 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm dark:border-zinc-800 dark:bg-zinc-900/30"
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <Badge tone={tone}>{result}</Badge>
                            <div className="truncate font-medium">
                              vs {opponent?.name ?? opponentId}
                            </div>
                          </div>
                          <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                            MW{match.matchweek} • {formatDateShort(match.date)}
                          </div>
                        </div>
                        <div className="tabular-nums font-semibold">
                          {gf}–{ga}
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
            </Card>

            <Card>
              <div className="text-sm font-semibold">Key players</div>
              <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                Sorted by goals, assists, xG
              </div>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full min-w-[420px] text-left text-sm">
                  <thead className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                    <tr className="border-b border-zinc-200 dark:border-zinc-800">
                      <th className="py-2 pr-3">Player</th>
                      <th className="py-2 pr-3">Pos</th>
                      <th className="py-2 pr-3">G</th>
                      <th className="py-2 pr-3">A</th>
                      <th className="py-2 text-right">xG</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamPlayers.slice(0, 8).map((p) => (
                      <tr
                        key={p.id}
                        className="border-b border-zinc-100 last:border-b-0 dark:border-zinc-900"
                      >
                        <td className="py-2 pr-3 font-medium">{p.name}</td>
                        <td className="py-2 pr-3 text-zinc-600 dark:text-zinc-400">
                          {p.position}
                        </td>
                        <td className="py-2 pr-3 tabular-nums">{p.goals}</td>
                        <td className="py-2 pr-3 tabular-nums">{p.assists}</td>
                        <td className="py-2 text-right tabular-nums">
                          {formatDecimal(p.xg, 1)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </>
      )}
    </div>
  )
}

