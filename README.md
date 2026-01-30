# Football Stats Hub

A modern, responsive website for tracking football (soccer) statistics, league standings, player stats, and match results.

## Features

- **League Standings**: View current standings for Premier League, La Liga, Bundesliga, and Serie A
- **Top Players**: Track top scorers, assist leaders, and highest-rated players
- **Match Center**: Live matches, recent results, and upcoming fixtures
- **Season Statistics**: Overview of goals, cards, clean sheets, and attendance
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## Tech Stack

- **HTML5**: Semantic markup structure
- **CSS3**: Modern styling with CSS variables, flexbox, and grid
- **JavaScript**: Vanilla JS for interactivity and data rendering
- **Google Fonts**: Inter font family for clean typography

## Getting Started

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Open `index.html` in your browser, or serve with any static file server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (http-server)
   npx http-server
   ```

3. Navigate to `http://localhost:8000` in your browser

## Project Structure

```
football-stats-site/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # All styles
├── js/
│   ├── data.js         # Sample data for leagues, players, and matches
│   └── app.js          # Main application logic
└── README.md           # Project documentation
```

## Features Breakdown

### League Standings
- Switch between major European leagues
- View position, matches played, wins, draws, losses, goals, and points
- Color-coded positions for Champions League, Europa League, and relegation zones
- Recent form indicator

### Top Players
- Filter by goals, assists, or rating
- Player cards with stats and team information
- Gold, silver, and bronze badges for top 3

### Matches
- Filter by all, live, finished, or upcoming
- Live match indicator with pulsing animation
- Score display with team logos

### Statistics
- Total goals and goals per match
- Yellow and red card counts
- Clean sheets and average attendance
- Trend indicators

## Customization

### Adding New Data
Edit `js/data.js` to add or modify:
- League standings in `leagueData`
- Player statistics in `playersData`
- Match fixtures in `matchesData`

### Styling
Modify CSS variables in `css/styles.css`:
```css
:root {
    --primary: #1a73e8;
    --secondary: #34a853;
    --accent: #ea4335;
    /* ... more variables */
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - feel free to use this project for personal or commercial purposes.
