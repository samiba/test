import type { Match, Player, Team } from '../data/sampleLeague'

export type StandingRow = {
  teamId: string
  played: number
  wins: number
  draws: number
  losses: number
  goalsFor: number
  goalsAgainst: number
  goalDiff: number
  points: number
  xgFor: number
  xgAgainst: number
  xgDiff: number
}

export function getStandings(teams: Team[], matches: Match[]): StandingRow[] {
  const rows = new Map<string, StandingRow>()
  for (const t of teams) {
    rows.set(t.id, {
      teamId: t.id,
      played: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDiff: 0,
      points: 0,
      xgFor: 0,
      xgAgainst: 0,
      xgDiff: 0,
    })
  }

  const ensure = (teamId: string) => {
    const row = rows.get(teamId)
    if (!row) throw new Error(`Unknown teamId: ${teamId}`)
    return row
  }

  for (const m of matches) {
    const home = ensure(m.homeTeamId)
    const away = ensure(m.awayTeamId)

    home.played += 1
    away.played += 1

    home.goalsFor += m.homeGoals
    home.goalsAgainst += m.awayGoals
    away.goalsFor += m.awayGoals
    away.goalsAgainst += m.homeGoals

    home.xgFor += m.homeXg
    home.xgAgainst += m.awayXg
    away.xgFor += m.awayXg
    away.xgAgainst += m.homeXg

    if (m.homeGoals > m.awayGoals) {
      home.wins += 1
      home.points += 3
      away.losses += 1
    } else if (m.homeGoals < m.awayGoals) {
      away.wins += 1
      away.points += 3
      home.losses += 1
    } else {
      home.draws += 1
      away.draws += 1
      home.points += 1
      away.points += 1
    }
  }

  const out = [...rows.values()].map((r) => ({
    ...r,
    goalDiff: r.goalsFor - r.goalsAgainst,
    xgDiff: round1(r.xgFor - r.xgAgainst),
    xgFor: round1(r.xgFor),
    xgAgainst: round1(r.xgAgainst),
  }))

  // Sort: points, GD, GF, xGD, name (stable)
  const teamById = new Map(teams.map((t) => [t.id, t]))
  out.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points
    if (b.goalDiff !== a.goalDiff) return b.goalDiff - a.goalDiff
    if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor
    if (b.xgDiff !== a.xgDiff) return b.xgDiff - a.xgDiff
    return (teamById.get(a.teamId)?.name ?? a.teamId).localeCompare(
      teamById.get(b.teamId)?.name ?? b.teamId,
    )
  })

  return out
}

export function getLeagueTotals(matches: Match[]) {
  const totalGoals = matches.reduce((sum, m) => sum + m.homeGoals + m.awayGoals, 0)
  return {
    matches: matches.length,
    goals: totalGoals,
    avgGoalsPerMatch: matches.length ? totalGoals / matches.length : 0,
  }
}

export function getTopScorers(players: Player[], limit = 10) {
  return [...players]
    .sort((a, b) => {
      if (b.goals !== a.goals) return b.goals - a.goals
      if (b.assists !== a.assists) return b.assists - a.assists
      if (b.xg !== a.xg) return b.xg - a.xg
      return a.name.localeCompare(b.name)
    })
    .slice(0, limit)
}

export function getGoalsByMatchweek(matches: Match[]) {
  const map = new Map<number, { matchweek: number; goals: number }>()
  for (const m of matches) {
    const curr = map.get(m.matchweek) ?? { matchweek: m.matchweek, goals: 0 }
    curr.goals += m.homeGoals + m.awayGoals
    map.set(m.matchweek, curr)
  }
  return [...map.values()].sort((a, b) => a.matchweek - b.matchweek)
}

export function getTeamForm(matches: Match[], teamId: string, limit = 5) {
  const relevant = matches
    .filter((m) => m.homeTeamId === teamId || m.awayTeamId === teamId)
    .slice()
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
    .slice(0, limit)

  return relevant.map((m) => {
    const home = m.homeTeamId === teamId
    const gf = home ? m.homeGoals : m.awayGoals
    const ga = home ? m.awayGoals : m.homeGoals
    const result: 'W' | 'D' | 'L' = gf > ga ? 'W' : gf < ga ? 'L' : 'D'
    return { match: m, gf, ga, result }
  })
}

function round1(n: number) {
  return Math.round(n * 10) / 10
}

