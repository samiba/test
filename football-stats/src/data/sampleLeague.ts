export type Team = {
  id: string
  name: string
  shortName: string
  color: string
}

export type Player = {
  id: string
  teamId: string
  name: string
  position: 'GK' | 'DF' | 'MF' | 'FW'
  nationality: string
  minutes: number
  goals: number
  assists: number
  xg: number
}

export type Match = {
  id: string
  matchweek: number
  date: string // YYYY-MM-DD
  homeTeamId: string
  awayTeamId: string
  homeGoals: number
  awayGoals: number
  homeXg: number
  awayXg: number
}

export const league = {
  id: 'sample-premier-league',
  name: 'Premier League (Sample)',
  season: '2025–26',
} as const

export const teams: Team[] = [
  { id: 'ars', name: 'Arsenal', shortName: 'ARS', color: '#EF0107' },
  { id: 'mci', name: 'Manchester City', shortName: 'MCI', color: '#6CABDD' },
  { id: 'liv', name: 'Liverpool', shortName: 'LIV', color: '#C8102E' },
  { id: 'che', name: 'Chelsea', shortName: 'CHE', color: '#034694' },
  { id: 'tot', name: 'Tottenham', shortName: 'TOT', color: '#132257' },
  { id: 'mun', name: 'Manchester United', shortName: 'MUN', color: '#DA291C' },
]

export const players: Player[] = [
  {
    id: 'p-saka',
    teamId: 'ars',
    name: 'Bukayo Saka',
    position: 'FW',
    nationality: 'ENG',
    minutes: 990,
    goals: 6,
    assists: 5,
    xg: 5.4,
  },
  {
    id: 'p-odegaard',
    teamId: 'ars',
    name: 'Martin Ødegaard',
    position: 'MF',
    nationality: 'NOR',
    minutes: 950,
    goals: 4,
    assists: 4,
    xg: 3.2,
  },
  {
    id: 'p-haaland',
    teamId: 'mci',
    name: 'Erling Haaland',
    position: 'FW',
    nationality: 'NOR',
    minutes: 920,
    goals: 10,
    assists: 2,
    xg: 9.1,
  },
  {
    id: 'p-debruyne',
    teamId: 'mci',
    name: 'Kevin De Bruyne',
    position: 'MF',
    nationality: 'BEL',
    minutes: 780,
    goals: 3,
    assists: 6,
    xg: 2.4,
  },
  {
    id: 'p-salah',
    teamId: 'liv',
    name: 'Mohamed Salah',
    position: 'FW',
    nationality: 'EGY',
    minutes: 980,
    goals: 8,
    assists: 4,
    xg: 7.0,
  },
  {
    id: 'p-nunez',
    teamId: 'liv',
    name: 'Darwin Núñez',
    position: 'FW',
    nationality: 'URU',
    minutes: 860,
    goals: 5,
    assists: 3,
    xg: 6.1,
  },
  {
    id: 'p-palmer',
    teamId: 'che',
    name: 'Cole Palmer',
    position: 'MF',
    nationality: 'ENG',
    minutes: 960,
    goals: 7,
    assists: 4,
    xg: 5.9,
  },
  {
    id: 'p-jackson',
    teamId: 'che',
    name: 'Nicolas Jackson',
    position: 'FW',
    nationality: 'SEN',
    minutes: 880,
    goals: 5,
    assists: 2,
    xg: 5.4,
  },
  {
    id: 'p-son',
    teamId: 'tot',
    name: 'Son Heung-min',
    position: 'FW',
    nationality: 'KOR',
    minutes: 940,
    goals: 7,
    assists: 3,
    xg: 6.3,
  },
  {
    id: 'p-maddison',
    teamId: 'tot',
    name: 'James Maddison',
    position: 'MF',
    nationality: 'ENG',
    minutes: 910,
    goals: 3,
    assists: 5,
    xg: 3.0,
  },
  {
    id: 'p-bruno',
    teamId: 'mun',
    name: 'Bruno Fernandes',
    position: 'MF',
    nationality: 'POR',
    minutes: 970,
    goals: 4,
    assists: 4,
    xg: 3.3,
  },
  {
    id: 'p-rashford',
    teamId: 'mun',
    name: 'Marcus Rashford',
    position: 'FW',
    nationality: 'ENG',
    minutes: 900,
    goals: 5,
    assists: 2,
    xg: 4.9,
  },
]

export const matches: Match[] = [
  // Matchweek 1
  {
    id: 'mw1-ars-che',
    matchweek: 1,
    date: '2025-08-16',
    homeTeamId: 'ars',
    awayTeamId: 'che',
    homeGoals: 2,
    awayGoals: 1,
    homeXg: 1.7,
    awayXg: 1.1,
  },
  {
    id: 'mw1-liv-tot',
    matchweek: 1,
    date: '2025-08-17',
    homeTeamId: 'liv',
    awayTeamId: 'tot',
    homeGoals: 2,
    awayGoals: 2,
    homeXg: 1.9,
    awayXg: 1.6,
  },
  {
    id: 'mw1-mci-mun',
    matchweek: 1,
    date: '2025-08-17',
    homeTeamId: 'mci',
    awayTeamId: 'mun',
    homeGoals: 3,
    awayGoals: 1,
    homeXg: 2.4,
    awayXg: 0.9,
  },
  // Matchweek 2
  {
    id: 'mw2-che-liv',
    matchweek: 2,
    date: '2025-08-23',
    homeTeamId: 'che',
    awayTeamId: 'liv',
    homeGoals: 1,
    awayGoals: 2,
    homeXg: 1.0,
    awayXg: 1.8,
  },
  {
    id: 'mw2-tot-mci',
    matchweek: 2,
    date: '2025-08-24',
    homeTeamId: 'tot',
    awayTeamId: 'mci',
    homeGoals: 1,
    awayGoals: 2,
    homeXg: 1.2,
    awayXg: 2.0,
  },
  {
    id: 'mw2-mun-ars',
    matchweek: 2,
    date: '2025-08-24',
    homeTeamId: 'mun',
    awayTeamId: 'ars',
    homeGoals: 1,
    awayGoals: 1,
    homeXg: 1.3,
    awayXg: 1.4,
  },
  // Matchweek 3
  {
    id: 'mw3-ars-liv',
    matchweek: 3,
    date: '2025-08-30',
    homeTeamId: 'ars',
    awayTeamId: 'liv',
    homeGoals: 1,
    awayGoals: 2,
    homeXg: 1.5,
    awayXg: 1.7,
  },
  {
    id: 'mw3-mci-che',
    matchweek: 3,
    date: '2025-08-31',
    homeTeamId: 'mci',
    awayTeamId: 'che',
    homeGoals: 2,
    awayGoals: 0,
    homeXg: 2.1,
    awayXg: 0.8,
  },
  {
    id: 'mw3-tot-mun',
    matchweek: 3,
    date: '2025-08-31',
    homeTeamId: 'tot',
    awayTeamId: 'mun',
    homeGoals: 3,
    awayGoals: 2,
    homeXg: 2.0,
    awayXg: 1.4,
  },
  // Matchweek 4
  {
    id: 'mw4-liv-mci',
    matchweek: 4,
    date: '2025-09-13',
    homeTeamId: 'liv',
    awayTeamId: 'mci',
    homeGoals: 2,
    awayGoals: 2,
    homeXg: 1.8,
    awayXg: 1.9,
  },
  {
    id: 'mw4-che-tot',
    matchweek: 4,
    date: '2025-09-14',
    homeTeamId: 'che',
    awayTeamId: 'tot',
    homeGoals: 2,
    awayGoals: 3,
    homeXg: 1.6,
    awayXg: 2.2,
  },
  {
    id: 'mw4-mun-ars',
    matchweek: 4,
    date: '2025-09-14',
    homeTeamId: 'mun',
    awayTeamId: 'ars',
    homeGoals: 0,
    awayGoals: 2,
    homeXg: 0.9,
    awayXg: 1.8,
  },
  // Matchweek 5
  {
    id: 'mw5-mci-ars',
    matchweek: 5,
    date: '2025-09-20',
    homeTeamId: 'mci',
    awayTeamId: 'ars',
    homeGoals: 2,
    awayGoals: 1,
    homeXg: 2.0,
    awayXg: 1.1,
  },
  {
    id: 'mw5-liv-che',
    matchweek: 5,
    date: '2025-09-21',
    homeTeamId: 'liv',
    awayTeamId: 'che',
    homeGoals: 3,
    awayGoals: 1,
    homeXg: 2.2,
    awayXg: 1.0,
  },
  {
    id: 'mw5-tot-mun',
    matchweek: 5,
    date: '2025-09-21',
    homeTeamId: 'tot',
    awayTeamId: 'mun',
    homeGoals: 1,
    awayGoals: 1,
    homeXg: 1.1,
    awayXg: 1.0,
  },
]

