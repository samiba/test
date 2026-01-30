// Football Stats Data

const leagueData = {
    premier: {
        name: "Premier League",
        teams: [
            { pos: 1, name: "Manchester City", logo: "🔵", p: 25, w: 20, d: 3, l: 2, gf: 62, ga: 18, pts: 63, form: ["W", "W", "W", "D", "W"] },
            { pos: 2, name: "Arsenal", logo: "🔴", p: 25, w: 19, d: 4, l: 2, gf: 58, ga: 20, pts: 61, form: ["W", "W", "L", "W", "W"] },
            { pos: 3, name: "Liverpool", logo: "🔴", p: 25, w: 18, d: 5, l: 2, gf: 55, ga: 22, pts: 59, form: ["D", "W", "W", "W", "D"] },
            { pos: 4, name: "Aston Villa", logo: "🟤", p: 25, w: 16, d: 4, l: 5, gf: 52, ga: 28, pts: 52, form: ["W", "L", "W", "W", "W"] },
            { pos: 5, name: "Tottenham", logo: "⚪", p: 25, w: 14, d: 4, l: 7, gf: 50, ga: 35, pts: 46, form: ["L", "W", "W", "D", "W"] },
            { pos: 6, name: "Manchester United", logo: "🔴", p: 25, w: 13, d: 4, l: 8, gf: 40, ga: 32, pts: 43, form: ["W", "D", "L", "W", "L"] },
            { pos: 7, name: "Newcastle", logo: "⬛", p: 25, w: 12, d: 5, l: 8, gf: 42, ga: 30, pts: 41, form: ["D", "W", "D", "L", "W"] },
            { pos: 8, name: "Brighton", logo: "🔵", p: 25, w: 10, d: 8, l: 7, gf: 45, ga: 38, pts: 38, form: ["D", "D", "W", "L", "D"] },
            { pos: 9, name: "West Ham", logo: "🟤", p: 25, w: 10, d: 5, l: 10, gf: 36, ga: 40, pts: 35, form: ["L", "W", "L", "W", "D"] },
            { pos: 10, name: "Chelsea", logo: "🔵", p: 25, w: 9, d: 6, l: 10, gf: 38, ga: 36, pts: 33, form: ["W", "L", "D", "D", "L"] },
            { pos: 11, name: "Bournemouth", logo: "🔴", p: 25, w: 9, d: 6, l: 10, gf: 34, ga: 42, pts: 33, form: ["L", "D", "W", "L", "W"] },
            { pos: 12, name: "Wolves", logo: "🟠", p: 25, w: 9, d: 5, l: 11, gf: 32, ga: 40, pts: 32, form: ["W", "L", "L", "D", "W"] },
            { pos: 13, name: "Fulham", logo: "⚪", p: 25, w: 8, d: 7, l: 10, gf: 30, ga: 35, pts: 31, form: ["D", "L", "W", "D", "L"] },
            { pos: 14, name: "Crystal Palace", logo: "🔵", p: 25, w: 7, d: 8, l: 10, gf: 28, ga: 38, pts: 29, form: ["L", "D", "D", "W", "L"] },
            { pos: 15, name: "Brentford", logo: "🔴", p: 25, w: 7, d: 7, l: 11, gf: 32, ga: 42, pts: 28, form: ["D", "L", "W", "L", "D"] },
            { pos: 16, name: "Everton", logo: "🔵", p: 25, w: 7, d: 6, l: 12, gf: 26, ga: 38, pts: 27, form: ["L", "L", "D", "W", "L"] },
            { pos: 17, name: "Nottm Forest", logo: "🔴", p: 25, w: 6, d: 8, l: 11, gf: 28, ga: 40, pts: 26, form: ["D", "D", "L", "L", "W"] },
            { pos: 18, name: "Luton Town", logo: "🟠", p: 25, w: 5, d: 6, l: 14, gf: 26, ga: 48, pts: 21, form: ["L", "L", "D", "L", "L"] },
            { pos: 19, name: "Burnley", logo: "🟤", p: 25, w: 4, d: 5, l: 16, gf: 22, ga: 52, pts: 17, form: ["L", "D", "L", "L", "L"] },
            { pos: 20, name: "Sheffield Utd", logo: "🔴", p: 25, w: 3, d: 4, l: 18, gf: 18, ga: 60, pts: 13, form: ["L", "L", "L", "D", "L"] }
        ]
    },
    laliga: {
        name: "La Liga",
        teams: [
            { pos: 1, name: "Real Madrid", logo: "⚪", p: 24, w: 18, d: 5, l: 1, gf: 52, ga: 18, pts: 59, form: ["W", "W", "D", "W", "W"] },
            { pos: 2, name: "Girona", logo: "🔴", p: 24, w: 17, d: 4, l: 3, gf: 55, ga: 25, pts: 55, form: ["W", "D", "W", "W", "L"] },
            { pos: 3, name: "Barcelona", logo: "🔵", p: 24, w: 15, d: 6, l: 3, gf: 48, ga: 28, pts: 51, form: ["D", "W", "W", "D", "W"] },
            { pos: 4, name: "Atletico Madrid", logo: "🔴", p: 24, w: 14, d: 5, l: 5, gf: 42, ga: 22, pts: 47, form: ["W", "L", "W", "W", "D"] },
            { pos: 5, name: "Athletic Bilbao", logo: "🔴", p: 24, w: 12, d: 8, l: 4, gf: 38, ga: 22, pts: 44, form: ["D", "D", "W", "W", "D"] },
            { pos: 6, name: "Real Betis", logo: "🟢", p: 24, w: 10, d: 8, l: 6, gf: 32, ga: 28, pts: 38, form: ["W", "D", "L", "D", "W"] },
            { pos: 7, name: "Real Sociedad", logo: "🔵", p: 24, w: 9, d: 9, l: 6, gf: 30, ga: 24, pts: 36, form: ["D", "L", "D", "W", "D"] },
            { pos: 8, name: "Valencia", logo: "🟠", p: 24, w: 8, d: 8, l: 8, gf: 32, ga: 32, pts: 32, form: ["L", "W", "D", "L", "W"] },
            { pos: 9, name: "Villarreal", logo: "🟡", p: 24, w: 8, d: 7, l: 9, gf: 34, ga: 34, pts: 31, form: ["W", "L", "L", "D", "W"] },
            { pos: 10, name: "Getafe", logo: "🔵", p: 24, w: 7, d: 10, l: 7, gf: 24, ga: 26, pts: 31, form: ["D", "D", "W", "L", "D"] }
        ]
    },
    bundesliga: {
        name: "Bundesliga",
        teams: [
            { pos: 1, name: "Bayer Leverkusen", logo: "🔴", p: 22, w: 18, d: 4, l: 0, gf: 58, ga: 16, pts: 58, form: ["W", "W", "W", "D", "W"] },
            { pos: 2, name: "Bayern Munich", logo: "🔴", p: 22, w: 15, d: 3, l: 4, gf: 56, ga: 24, pts: 48, form: ["W", "L", "W", "W", "D"] },
            { pos: 3, name: "VfB Stuttgart", logo: "⚪", p: 22, w: 14, d: 3, l: 5, gf: 52, ga: 28, pts: 45, form: ["W", "W", "L", "W", "W"] },
            { pos: 4, name: "RB Leipzig", logo: "⚪", p: 22, w: 13, d: 4, l: 5, gf: 48, ga: 26, pts: 43, form: ["D", "W", "W", "L", "W"] },
            { pos: 5, name: "Borussia Dortmund", logo: "🟡", p: 22, w: 11, d: 6, l: 5, gf: 44, ga: 30, pts: 39, form: ["W", "D", "D", "W", "L"] },
            { pos: 6, name: "Eintracht Frankfurt", logo: "⬛", p: 22, w: 9, d: 6, l: 7, gf: 36, ga: 32, pts: 33, form: ["L", "W", "D", "W", "D"] },
            { pos: 7, name: "SC Freiburg", logo: "🔴", p: 22, w: 9, d: 5, l: 8, gf: 32, ga: 36, pts: 32, form: ["D", "L", "W", "L", "W"] },
            { pos: 8, name: "Hoffenheim", logo: "🔵", p: 22, w: 8, d: 6, l: 8, gf: 40, ga: 38, pts: 30, form: ["W", "L", "D", "D", "L"] },
            { pos: 9, name: "Werder Bremen", logo: "🟢", p: 22, w: 7, d: 7, l: 8, gf: 32, ga: 36, pts: 28, form: ["D", "W", "L", "D", "W"] },
            { pos: 10, name: "Wolfsburg", logo: "🟢", p: 22, w: 7, d: 6, l: 9, gf: 28, ga: 32, pts: 27, form: ["L", "D", "W", "L", "D"] }
        ]
    },
    seriea: {
        name: "Serie A",
        teams: [
            { pos: 1, name: "Inter Milan", logo: "🔵", p: 24, w: 19, d: 4, l: 1, gf: 56, ga: 14, pts: 61, form: ["W", "W", "W", "W", "D"] },
            { pos: 2, name: "Juventus", logo: "⬛", p: 24, w: 14, d: 9, l: 1, gf: 42, ga: 18, pts: 51, form: ["D", "W", "D", "W", "D"] },
            { pos: 3, name: "AC Milan", logo: "🔴", p: 24, w: 14, d: 4, l: 6, gf: 46, ga: 28, pts: 46, form: ["W", "L", "W", "D", "W"] },
            { pos: 4, name: "Bologna", logo: "🔵", p: 24, w: 13, d: 6, l: 5, gf: 38, ga: 22, pts: 45, form: ["W", "W", "D", "L", "W"] },
            { pos: 5, name: "Roma", logo: "🟡", p: 24, w: 12, d: 5, l: 7, gf: 40, ga: 28, pts: 41, form: ["L", "W", "W", "D", "W"] },
            { pos: 6, name: "Atalanta", logo: "🔵", p: 24, w: 11, d: 6, l: 7, gf: 48, ga: 32, pts: 39, form: ["D", "W", "L", "W", "D"] },
            { pos: 7, name: "Lazio", logo: "🔵", p: 24, w: 11, d: 5, l: 8, gf: 38, ga: 30, pts: 38, form: ["W", "L", "D", "W", "L"] },
            { pos: 8, name: "Napoli", logo: "🔵", p: 24, w: 10, d: 6, l: 8, gf: 44, ga: 34, pts: 36, form: ["L", "D", "W", "L", "W"] },
            { pos: 9, name: "Fiorentina", logo: "🟣", p: 24, w: 9, d: 7, l: 8, gf: 38, ga: 32, pts: 34, form: ["D", "W", "D", "L", "D"] },
            { pos: 10, name: "Torino", logo: "🟤", p: 24, w: 8, d: 6, l: 10, gf: 30, ga: 32, pts: 30, form: ["L", "L", "W", "D", "W"] }
        ]
    }
};

const playersData = {
    goals: [
        { rank: 1, name: "Erling Haaland", team: "Manchester City", avatar: "👨‍🦱", goals: 22, assists: 5, rating: 8.4 },
        { rank: 2, name: "Mohamed Salah", team: "Liverpool", avatar: "👨", goals: 18, assists: 10, rating: 8.2 },
        { rank: 3, name: "Alexander Isak", team: "Newcastle", avatar: "👨‍🦱", goals: 16, assists: 4, rating: 7.9 },
        { rank: 4, name: "Ollie Watkins", team: "Aston Villa", avatar: "👨", goals: 15, assists: 9, rating: 7.8 },
        { rank: 5, name: "Son Heung-min", team: "Tottenham", avatar: "👨‍🦱", goals: 14, assists: 6, rating: 7.7 },
        { rank: 6, name: "Jarrod Bowen", team: "West Ham", avatar: "👨", goals: 13, assists: 8, rating: 7.6 },
        { rank: 7, name: "Cole Palmer", team: "Chelsea", avatar: "👨‍🦱", goals: 13, assists: 7, rating: 7.8 },
        { rank: 8, name: "Dominic Solanke", team: "Bournemouth", avatar: "👨", goals: 12, assists: 3, rating: 7.4 }
    ],
    assists: [
        { rank: 1, name: "Kevin De Bruyne", team: "Manchester City", avatar: "👨‍🦱", goals: 4, assists: 14, rating: 8.1 },
        { rank: 2, name: "Bukayo Saka", team: "Arsenal", avatar: "👨", goals: 12, assists: 12, rating: 8.3 },
        { rank: 3, name: "Mohamed Salah", team: "Liverpool", avatar: "👨", goals: 18, assists: 10, rating: 8.2 },
        { rank: 4, name: "Ollie Watkins", team: "Aston Villa", avatar: "👨", goals: 15, assists: 9, rating: 7.8 },
        { rank: 5, name: "Bruno Fernandes", team: "Manchester United", avatar: "👨‍🦱", goals: 8, assists: 8, rating: 7.5 },
        { rank: 6, name: "Jarrod Bowen", team: "West Ham", avatar: "👨", goals: 13, assists: 8, rating: 7.6 },
        { rank: 7, name: "Pascal Gross", team: "Brighton", avatar: "👨‍🦱", goals: 5, assists: 8, rating: 7.3 },
        { rank: 8, name: "Cole Palmer", team: "Chelsea", avatar: "👨‍🦱", goals: 13, assists: 7, rating: 7.8 }
    ],
    rating: [
        { rank: 1, name: "Erling Haaland", team: "Manchester City", avatar: "👨‍🦱", goals: 22, assists: 5, rating: 8.4 },
        { rank: 2, name: "Bukayo Saka", team: "Arsenal", avatar: "👨", goals: 12, assists: 12, rating: 8.3 },
        { rank: 3, name: "Virgil van Dijk", team: "Liverpool", avatar: "👨", goals: 2, assists: 1, rating: 8.2 },
        { rank: 4, name: "Mohamed Salah", team: "Liverpool", avatar: "👨", goals: 18, assists: 10, rating: 8.2 },
        { rank: 5, name: "William Saliba", team: "Arsenal", avatar: "👨‍🦱", goals: 1, assists: 0, rating: 8.1 },
        { rank: 6, name: "Kevin De Bruyne", team: "Manchester City", avatar: "👨‍🦱", goals: 4, assists: 14, rating: 8.1 },
        { rank: 7, name: "Martin Odegaard", team: "Arsenal", avatar: "👨", goals: 8, assists: 7, rating: 8.0 },
        { rank: 8, name: "Rodri", team: "Manchester City", avatar: "👨‍🦱", goals: 6, assists: 6, rating: 7.9 }
    ]
};

const matchesData = [
    { 
        id: 1,
        home: { name: "Arsenal", logo: "🔴", score: 3 },
        away: { name: "Liverpool", logo: "🔴", score: 1 },
        status: "finished",
        time: "Full Time",
        date: "Jan 29, 2026"
    },
    { 
        id: 2,
        home: { name: "Manchester City", logo: "🔵", score: 2 },
        away: { name: "Chelsea", logo: "🔵", score: 2 },
        status: "live",
        time: "76'",
        date: "Today"
    },
    { 
        id: 3,
        home: { name: "Tottenham", logo: "⚪", score: 1 },
        away: { name: "Aston Villa", logo: "🟤", score: 0 },
        status: "live",
        time: "34'",
        date: "Today"
    },
    { 
        id: 4,
        home: { name: "Newcastle", logo: "⬛", score: null },
        away: { name: "Manchester United", logo: "🔴", score: null },
        status: "upcoming",
        time: "20:00",
        date: "Today"
    },
    { 
        id: 5,
        home: { name: "Brighton", logo: "🔵", score: null },
        away: { name: "West Ham", logo: "🟤", score: null },
        status: "upcoming",
        time: "15:00",
        date: "Tomorrow"
    },
    { 
        id: 6,
        home: { name: "Everton", logo: "🔵", score: 0 },
        away: { name: "Burnley", logo: "🟤", score: 1 },
        status: "finished",
        time: "Full Time",
        date: "Jan 28, 2026"
    },
    { 
        id: 7,
        home: { name: "Wolves", logo: "🟠", score: 2 },
        away: { name: "Fulham", logo: "⚪", score: 3 },
        status: "finished",
        time: "Full Time",
        date: "Jan 28, 2026"
    },
    { 
        id: 8,
        home: { name: "Crystal Palace", logo: "🔵", score: null },
        away: { name: "Brentford", logo: "🔴", score: null },
        status: "upcoming",
        time: "17:30",
        date: "Feb 1, 2026"
    }
];
